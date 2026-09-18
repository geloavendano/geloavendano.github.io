# Production readiness: [project / release]

- **Owner:**
- **Target date:**
- **Critical user journey:**
- **Expected peak:**

## Availability and detection

- [ ] An external uptime check covers the public entry point.
- [ ] A synthetic check exercises the critical journey or its safest meaningful subset.
- [ ] Browser and server error tracking identify the release that failed.
- [ ] Critical scheduled jobs report both failure and missing runs.
- [ ] Alerts reach a named person and have a tested destination.
- [ ] Product events prove that the user outcome completed.

## Performance and volume

- [ ] A performance budget exists for the critical journey: p95 latency, page weight, or completion time.
- [ ] Staging contains realistic row and file volume.
- [ ] Expected concurrent load passes within the budget.
- [ ] A short spike test shows predictable slowdown or rejection without data corruption.
- [ ] A soak test covers long-running jobs, connections, retries, and queue buildup where relevant.
- [ ] Slow queries have indexes, bounded pagination, and query plans checked.
- [ ] Volume tests use generated staging data, not customer production data.

## Limits and dependencies

- [ ] Database connections, storage, bandwidth, function duration, email, maps, AI, and other quotas are recorded.
- [ ] Usage and cost alerts fire before hard limits.
- [ ] Expensive or abuse-prone operations are rate-limited.
- [ ] External calls have timeouts and bounded retries.
- [ ] Retried writes and webhooks are idempotent.
- [ ] Each critical dependency has a user-visible failure or fallback behavior.

## Data safety and recovery

- [ ] Database constraints and transactions protect important invariants.
- [ ] Backup coverage and retention are known for the database and uploaded files.
- [ ] A restore has been rehearsed into a safe environment.
- [ ] Recovery point objective (RPO) and recovery time objective (RTO) are written down.
- [ ] The release has a rollback or forward-fix plan, including database changes.
- [ ] Data export, retention, and deletion paths work.

## Security and privacy

- [ ] Authentication and authorization are tested separately.
- [ ] Every exposed table, file bucket, and server function is default-closed and least-privilege.
- [ ] Prices, permissions, identity claims, and results are rechecked at a trusted boundary.
- [ ] Secrets are absent from code, logs, analytics, browser bundles, and committed files.
- [ ] Dependencies and the release diff have been security-reviewed.
- [ ] Personal data collection, consent, and retention match the privacy policy.

## Accessibility and compatibility

- [ ] The critical journey works with keyboard only.
- [ ] Controls have useful names, errors are announced, and focus moves intentionally.
- [ ] Contrast, zoom, reduced motion, loading, empty, error, and offline states are checked.
- [ ] Supported browsers and devices complete the critical journey.

## Delivery and incident ownership

- [ ] CI passes build, types, lint, tests, link checks, and migration checks.
- [ ] Preview and staging behavior were verified before production.
- [ ] Production configuration and feature flags are documented.
- [ ] A named person can pause jobs, disable the feature, roll back, and restore service.
- [ ] Incident notes include detect, assess, contain, recover, and learn.
- [ ] The live URL and critical journey were verified after release.

## Launch decision

- **Decision:** ready / ready with accepted gaps / not ready
- **Accepted gaps:**
- **Approver:**
- **Next readiness review:**
