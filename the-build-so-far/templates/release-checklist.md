# Release checklist

- **Surface:** [web / iOS / Android / backend]
- **Source commit:**
- **Target environment:**
- **Release identity:** [deployment ID or version + build number]
- **Artifact:** [host build, archive path, AAB path, migration]

## Understand

- [ ] I can explain the changed flow from screen to stored result.
- [ ] I know which layer owns each business rule.
- [ ] I reviewed the diff, not only the agent's summary.

## Verify

- [ ] Build, type-check, lint, and relevant tests pass.
- [ ] Money, permissions, and multi-row writes have focused tests.
- [ ] Failure, retry, empty, and loading states were checked.
- [ ] Database changes ran in staging first and have a rollback or forward-fix plan.
- [ ] The artifact was built from the source commit above with the intended production configuration.

## Package and distribute

- [ ] **Web:** preview deployment checked; production domain points to the intended deployment.
- [ ] **iOS:** current web build synced; version/build incremented; Release tested on device; archive retained; uploaded build processed and tested through TestFlight.
- [ ] **Android:** current web build synced; version code incremented; signed AAB retained; test track passed.
- [ ] Store metadata, privacy answers, screenshots, support URL, review notes, and release controls are complete where applicable.

## Operate

- [ ] Logs contain enough context without secrets or personal data.
- [ ] Error tracking and the relevant alert are active.
- [ ] Documentation changed in the same commit as behavior.
- [ ] The deployed URL and production behavior were verified.
