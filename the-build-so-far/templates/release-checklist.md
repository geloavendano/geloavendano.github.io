# Release checklist

## Understand

- [ ] I can explain the changed flow from screen to stored result.
- [ ] I know which layer owns each business rule.
- [ ] I reviewed the diff, not only the agent's summary.

## Verify

- [ ] Build, type-check, lint, and relevant tests pass.
- [ ] Money, permissions, and multi-row writes have focused tests.
- [ ] Failure, retry, empty, and loading states were checked.
- [ ] Database changes ran in staging first and have a rollback or forward-fix plan.

## Operate

- [ ] Logs contain enough context without secrets or personal data.
- [ ] Error tracking and the relevant alert are active.
- [ ] Documentation changed in the same commit as behavior.
- [ ] The deployed URL and production behavior were verified.
