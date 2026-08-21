# Content TODO — evidence needed from Atharva

This site builds and runs cleanly today, but several facts from the résumé and
the old portfolio could not be verified against public artifacts. Nothing below
is invented; each item is either omitted, labeled "self-reported", or rendered in
the restrained "Reported highlights" section until real evidence arrives.

## 1. MiniGPT (public repo) — highest priority

- [ ] **Parameter count reconciliation** — README says 22M, but `GPTConfig`
      (vocab 100,277 cl100k, d_model 384, 6 layers, weight-tied head) computes
      ≈49M parameters. Publish the true count (or fix the config/README) before
      quoting any size on this site. Currently no parameter count is displayed.
- [ ] **Validation loss / perplexity** — README still contains `[YOUR_PPL]`.
      Finish a training run, record final val loss/perplexity + tokens trained,
      then add a verified metric with a link to W&B or a results file.
- [ ] **Training curves screenshot** — replace `[Insert W&B screenshot here]`.
- [ ] **Hugging Face links** — README badges point to `YOUR_USERNAME` /
      `YOUR_PROFILE`. Either publish model+demo or remove the badges.
- [ ] Optional: hosted live demo URL → becomes `demoUrl` on the case study.

## 2. Autonomous Research Agent with RAG

All four numbers on the case study (~92% retrieval accuracy, ~75% hallucination
reduction, 500+ queries, <2s latency) are labeled self-reported because:

- [ ] Public repository (sanitized) or open-source retrieval pipeline
- [ ] Eval harness code + labeled query set (methodology doc)
- [ ] Benchmark write-up with per-stage numbers
- [ ] Screenshot/recording of the Streamlit interface

Until then: metrics render with the amber "self-reported" label only.

## 3. Real-Time Object Detection & Tracking

- [ ] Public repository
- [ ] MOT-benchmark evaluation (MOT16/17 protocol) replacing the ~95% MOTA-style
      self-report
- [ ] Sample output video or annotated frames (with permission)

## 4. InfernoServe / Sentinel / GradMesh / CortexGraph / Atlas

No local implementation and no public repo was found during the audit, so all are
listed under **Roadmap** with status `planned`. Résumé placeholder values
(`[1000-1500]`, `[65-75]%`, `[75-90]%`, `[90-99]%`, `[85]%`) were never carried
into the site.

- [ ] If implementations exist somewhere private: publish at least a benchmark
      script + README, then promote them to case studies with exact links.
- [ ] Otherwise: keep as roadmap until built.

## 5. Achievements / highlights

Currently none qualify as verified, so nothing renders prominently:

- [ ] Kaggle top-15% claim → public profile/competition leaderboard link
- [ ] Hackathon finalist → event page or Devpost link (+ event name & date)
- [ ] Open-source contributions → links to merged PRs
- [ ] DataCamp course (250+ students, 4.65 rating) → public instructor/course
      page; once linked it can be promoted from "Reported highlights"
- [ ] "Top 1000 website in India (2012–13)" → archived; needs third-party source

## 6. Assets

- [ ] Professional photo or illustrated portrait (optional; currently none used)
- [ ] Project screenshots/screen-recordings for MiniGPT demo UI
- [ ] Confirm canonical domain: `atharvapatel.com` was unreachable during the
      audit. Site defaults to the Netlify URL via `NEXT_PUBLIC_SITE_URL`; switch
      once the domain resolves.

## 7. Résumé PDF

The bundled PDF (`public/Atharva-A-Patel-Resume.pdf`) is the current AI/ML résumé.
It still contains bracketed placeholders and typos ("Pythonproficient",
"80percent", malformed "¡2 second"). Regenerate a clean PDF and replace the file;
keep the phone number inside the PDF only.
