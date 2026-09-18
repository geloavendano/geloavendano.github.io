# Pre-build decisions: [project]

- **Date:**
- **Decision owner:**
- **Next review:**

Answer briefly. If an answer needs a long debate, create a decision record and link it here.

## 1. Scope and shape

- **Who is this for?**
- **What job must it do?**
- **Smallest useful user journey:**
- **Content, tool, or both?**
- **Important states and branches:**

## 2. Surfaces and shared logic

- **Surfaces now:**
- **Surfaces likely later:**
- **Rules shared by two or more surfaces:**
- **Where those shared rules will live:**

## 3. Data

- **Core entities:**
- **Important relationships:**
- **Date and status meanings that must not drift:**
- **What must be retained after cancellation or deletion:**

## 4. Trust boundary

- **Browser may suggest:**
- **Server or database must decide:**
- **Secrets required:**
- **Writes that must succeed or fail together:**

## 5. Environments

- **Production:**
- **Staging:** yes / no
- **How staging gets realistic data:**
- **What must never be tested in production:**

## 6. Deployment and change pipeline

- **Build step:**
- **Hosting:**
- **Preview process:**
- **Database migration process:**
- **Rollback or forward-fix plan:**

## 7. Languages and types

- **Languages:**
- **Why each is necessary:**
- **Type strategy:**
- **Database types generated:** yes / no

## 8. Build, buy, or share

| Capability | Build / buy / share | Choice | Why | Risk accepted |
|---|---|---|---|---|
| Database | | | | |
| Authentication | | | | |
| Hosting | | | | |
| Payments | | | | |
| Email | | | | |
| Analytics | | | | |

## 9. Failure visibility

- **Error tracking:**
- **Useful logs:**
- **Alerts:**
- **Cheap integrity check:**
- **Silent failures explicitly forbidden:**

## 10. Team, lifespan, and success

- **Maintainers:**
- **Expected lifespan:**
- **Primary success measure:**
- **Events captured from day one:**
- **Documentation and review discipline:**

## Decisions and outputs

- [ ] Complete `stack-plan.md` from all ten answers and the scale assumptions.
- [ ] Update `app-brief.md` from questions 1, 2, and 10.
- [ ] Update `data-dictionary.md` from question 3.
- [ ] Update the first `feature-xray.md` from questions 2 and 4.
- [ ] Create a `decision-record.md` for any hard-to-reverse choice in questions 5–8.
- [ ] Tailor `release-checklist.md` from questions 5, 6, and 9.
- [ ] Complete `production-readiness.md` before launch or a major traffic event.

## Unresolved questions

| Question | Owner | Needed by | Temporary assumption |
|---|---|---|---|
| | | | |
