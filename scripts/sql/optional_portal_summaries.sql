-- Optional read-only summaries. Both functions use the caller’s existing row policies.
create or replace function public.admin_review_snapshot() returns jsonb
language plpgsql stable security invoker set search_path = '' as $$
begin
  if not public.is_admin() then
    raise exception 'Administrator access required' using errcode = '42501';
  end if;
  return (
    with experts as materialized (
      select id, display_name from public.profiles where role = 'reviewer' and not is_test_account
    ), active_pairs as materialized (
      select id from public.review_pairs where is_active
    ), labels as materialized (
      select r.pair_id, r.reviewer_id, r.label, r.reviewed_at, r.review_duration_seconds as seconds
      from public.reviews r join active_pairs p on p.id = r.pair_id join experts e on e.id = r.reviewer_id
    ), complete as (
      select count(*) as votes, count(distinct label) as kinds,
             count(*) filter (where label = 'potential_lasa') as yes_votes,
             count(*) filter (where label = 'false_positive') as no_votes
      from labels group by pair_id having count(*) = (select count(*) from experts)
    ), daily as (
      select reviewer_id, (reviewed_at at time zone 'Asia/Manila')::date as day, count(*) as n
      from labels group by 1, 2
    ), by_reviewer as (
      select reviewer_id, count(*) as completed, max(reviewed_at) as last,
             round(avg(seconds) filter (where seconds > 0 and seconds < 3600)) as average,
             count(*) filter (where seconds > 0 and seconds < 3600) as timed,
             count(*) filter (where seconds >= 3600) as excluded
      from labels group by reviewer_id
    )
    select jsonb_build_object(
      'pairCount', (select count(*) from active_pairs),
      'completed', (select count(*) from labels),
      'distribution', (select coalesce(jsonb_object_agg(label, n), '{}') from
        (select label, count(*) n from labels group by label) d),
      'interim', (select jsonb_build_object(
        'fullyReviewed', count(*), 'unanimousPairs', count(*) filter (where kinds = 1),
        'potentialMajority', count(*) filter (where yes_votes * 2 > votes),
        'falsePositiveMajority', count(*) filter (where no_votes * 2 > votes),
        'unresolvedMajority', count(*) filter (where yes_votes * 2 <= votes and no_votes * 2 <= votes)
      ) from complete),
      'reviewers', (select coalesce(jsonb_agg(jsonb_build_object(
        'id', e.id, 'display_name', e.display_name, 'completed', coalesce(b.completed, 0),
        'last', b.last, 'average', b.average, 'timed', coalesce(b.timed, 0),
        'excluded', coalesce(b.excluded, 0), 'days',
        (select coalesce(jsonb_object_agg(day, n), '{}') from daily where reviewer_id = e.id)
      ) order by e.display_name, e.id), '[]') from experts e left join by_reviewer b on b.reviewer_id = e.id)
    )
  );
end;
$$;

-- Calendar and timing include historical labels, while progress uses the active queue.
create or replace function public.own_review_activity() returns jsonb
language sql stable security invoker set search_path = '' as $$
  with days as (
    select (reviewed_at at time zone 'Asia/Manila')::date as day, count(*) as n,
           count(*) filter (where review_duration_seconds between 1 and 3599) as timed,
           coalesce(sum(review_duration_seconds) filter (where review_duration_seconds between 1 and 3599), 0) as seconds,
           count(*) filter (where review_duration_seconds >= 3600) as excluded,
           floor(extract(epoch from min(reviewed_at)) * 1000) as first_ms,
           floor(extract(epoch from max(reviewed_at)) * 1000) as last_ms
    from public.reviews where reviewer_id = (select auth.uid()) group by 1
  )
  select jsonb_build_object(
    'pairCount', (select count(*) from public.review_pairs where is_active),
    'completed', (select count(*) from public.reviews r join public.review_pairs p on p.id = r.pair_id
                  where r.reviewer_id = (select auth.uid()) and p.is_active),
    'days', coalesce(jsonb_object_agg(day, jsonb_build_object('count', n, 'timedCount', timed,
              'totalSeconds', seconds, 'firstAt', first_ms, 'lastAt', last_ms)), '{}'),
    'timedCount', coalesce(sum(timed), 0), 'excludedCount', coalesce(sum(excluded), 0),
    'averageSeconds', round(sum(seconds) / nullif(sum(timed), 0))
  ) from days;
$$;

revoke all on function public.admin_review_snapshot(), public.own_review_activity() from public, anon;
grant execute on function public.admin_review_snapshot(), public.own_review_activity() to authenticated;
