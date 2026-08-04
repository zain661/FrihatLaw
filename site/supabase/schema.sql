-- Frihat Group blog articles table.
-- Run this once in the Supabase SQL editor (Project -> SQL Editor -> New query -> paste -> Run).

create table if not exists public.articles (
  id text primary key,
  title text not null,
  excerpt text not null default '',
  content text not null,
  author jsonb not null,
  category text not null,
  image text,
  date date not null default current_date,
  views integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.articles enable row level security;

-- Everyone (including anonymous site visitors) can read articles.
create policy "Public read access" on public.articles
  for select using (true);

-- The /admin/post-article password screen is a client-side UI gate only,
-- not real authentication (see AdminGate.jsx). These policies are
-- intentionally open to anon so the publish/edit/delete flow keeps working
-- without a backend. That also means anyone who finds the anon key (visible
-- in the deployed JS bundle) could write directly via the Supabase API,
-- bypassing the password screen. Acceptable for an internal soft launch;
-- swap for Supabase Auth + scoped policies before this holds anything
-- sensitive.
create policy "Public insert access" on public.articles
  for insert with check (true);

create policy "Public update access" on public.articles
  for update using (true);

create policy "Public delete access" on public.articles
  for delete using (true);

-- Atomic view counter — run this in the Supabase SQL editor too.
-- Called via supabase.rpc('increment_views', { article_id }) from the site
-- so concurrent readers can't race a read-modify-write on the client.
create or replace function public.increment_views(article_id text)
returns void
language sql
as $$
  update public.articles set views = coalesce(views, 0) + 1 where id = article_id;
$$;

grant execute on function public.increment_views(text) to anon, authenticated;

-- Newsletter subscribers.
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Visitors can subscribe (insert their own email) but cannot read the list
-- back — that would leak every other subscriber's address to anyone with
-- the public anon key. Reading the list is done server-side only (service
-- role key), e.g. by scripts/send-newsletter.mjs.
create policy "Public insert access" on public.newsletter_subscribers
  for insert with check (true);

-- Public storage bucket for article cover images — replaces storing images
-- as base64 data URLs directly in the articles table.
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

-- Everyone (including anonymous site visitors) can view uploaded images —
-- required since article covers are rendered on public blog pages.
create policy "Public read access for article images" on storage.objects
  for select using (bucket_id = 'article-images');

-- Same soft-launch tradeoff as the articles table above: the admin publish
-- flow only has a client-side password gate (see AdminGate.jsx), so uploads
-- run through the anon key. Swap for Supabase Auth + scoped policies before
-- this holds anything sensitive.
create policy "Public upload access for article images" on storage.objects
  for insert with check (bucket_id = 'article-images');

create policy "Public update access for article images" on storage.objects
  for update using (bucket_id = 'article-images');

create policy "Public delete access for article images" on storage.objects
  for delete using (bucket_id = 'article-images');

-- Seed content — regenerate with: node scripts/generate-seed-sql.mjs
-- Safe to re-run; existing rows with the same id are skipped.
insert into public.articles (id, title, excerpt, content, author, category, image, date, views)
values
('seed-1', 'التحكيم التجاري في القانون الفلسطيني: متى يكون الخيار الأفضل؟', 'يوفر التحكيم التجاري بديلاً أسرع وأكثر مرونة من التقاضي التقليدي لحل النزاعات بين الشركات. نستعرض متى يُنصح باللجوء إليه وكيف يحمي مصالح الأطراف.', 'يشهد اللجوء إلى التحكيم التجاري في فلسطين نموًا ملحوظًا بين الشركات والمؤسسات التي تبحث عن آلية أسرع وأكثر خصوصية لحل نزاعاتها التجارية، مقارنة بالمسار القضائي التقليدي الذي قد يمتد لسنوات.

من أبرز مزايا التحكيم أنه يمنح الأطراف حرية اختيار المحكّمين ذوي الخبرة في مجال النزاع تحديدًا، إضافة إلى سرية الإجراءات التي تحمي سمعة الشركات التجارية، وإمكانية تنفيذ القرار التحكيمي محليًا ودوليًا وفق الاتفاقيات ذات الصلة.

ننصح عملاءنا بإدراج شرط التحكيم بشكل واضح ودقيق في العقود التجارية منذ البداية، وتحديد مقر التحكيم والقانون الواجب التطبيق، لتجنب أي نزاع لاحق حول الاختصاص.

فريق فريحات للمحاماة يرافق عملاءه في جميع مراحل التحكيم، من صياغة الشرط التحكيمي وحتى تمثيلهم أمام هيئة التحكيم ومتابعة التنفيذ.', '{"name":"المحامية أسيل","title":"رئيسة قسم الشركات والخدمات المحلية"}'::jsonb, 'legal', '/brand/office-2.jpg', '2026-07-20', 0),
('seed-2', 'كيف تحمي علامتك التجارية دوليًا بموجب معاهدة TRIPS؟', 'تسجيل العلامة التجارية محليًا لا يكفي لحمايتها في الأسواق الخارجية. إليك الخطوات العملية للحماية الدولية وفق اتفاقية التريبس ومعاهدتي باريس وبيرن.', 'مع توسع الشركات الفلسطينية نحو الأسواق الإقليمية والدولية، أصبحت حماية العلامة التجارية خارج الحدود المحلية ضرورة وليست خيارًا. اتفاقية التريبس (TRIPS) ومعاهدتا باريس وبيرن توفر إطارًا قانونيًا يتيح للشركات تسجيل علاماتها والدفاع عنها في دول متعددة.

الخطوة الأولى تكون دائمًا بإجراء بحث شامل للتأكد من عدم وجود تعارض مع علامات مسجلة مسبقًا في السوق المستهدف. بعدها يتم تحديد المسار الأنسب: تسجيل مباشر في كل دولة، أو عبر أنظمة إقليمية ودولية موحدة توفر وقتًا وتكلفة أقل.

من المهم أيضًا متابعة تجديد التسجيل دوريًا، ومراقبة السوق لرصد أي انتهاك أو تقليد مبكرًا قبل أن يتوسع ويصعب التعامل معه.

فريق فريحات لخدمات الملكية الفكرية يمتلك شبكة شراكات دولية تُمكّن عملاءنا من تسجيل علاماتهم وحماية حقوقهم في الأسواق التي يستهدفونها بثقة.', '{"name":"المحامية سارة","title":"رئيسة قسم الملكية الفكرية والخدمات الدولية"}'::jsonb, 'ip', '/brand/ip-collage-trademarks.png', '2026-07-10', 0),
('seed-3', '5 خطوات لأتمتة إدارة الرواتب في مؤسستك', 'الانتقال من الجداول اليدوية إلى نظام رواتب آلي يقلل الأخطاء ويوفر الوقت. نستعرض خطوات عملية لبدء التحول الرقمي في إدارة الرواتب.', 'لا تزال كثير من المؤسسات الفلسطينية تعتمد على جداول بيانات يدوية لإدارة رواتب موظفيها، رغم ما يحمله ذلك من مخاطر الأخطاء الحسابية وضياع الوقت شهريًا في المراجعة والتدقيق.

الخطوة الأولى نحو الأتمتة هي توحيد بيانات الموظفين في قاعدة بيانات مركزية واحدة، تشمل الرواتب الأساسية والبدلات والخصومات وفق قانون العمل الفلسطيني.

بعدها يتم ربط النظام بآليات حساب تلقائية للضريبة والتأمينات، مع إمكانية إصدار قسائم رواتب إلكترونية لكل موظف، وتقارير مالية جاهزة للإدارة دون تدخل يدوي.

نظام كيان NHR يرافق المؤسسات في هذا التحول خطوة بخطوة، بدءًا من ترحيل البيانات وحتى التدريب الكامل لفريق الموارد البشرية على النظام الجديد.', '{"name":"فريق كيان NHR","title":"استشارات الموارد البشرية"}'::jsonb, 'hr', '/brand/office-width-1.jpg', '2026-06-28', 0),
('seed-4', 'فريحات جروب تطلق كيان NHR لإدارة الموارد البشرية', 'في إطار توسعها المؤسسي، أعلنت فريحات جروب عن إطلاق كيان NHR كذراع متخصصة في حلول الموارد البشرية والاستشارات الإدارية والمالية.', 'أعلنت فريحات جروب رسميًا عن إطلاق كيان NHR، الذراع الثالثة للمجموعة المتخصصة في إدارة الموارد البشرية والاستشارات الإدارية والمالية للمؤسسات، لتكتمل بذلك المنظومة المؤسسية التي تجمع الخبرة القانونية وحماية الملكية الفكرية وحلول الموارد البشرية تحت مظلة واحدة.

يأتي هذا التوسع استجابة لاحتياج متزايد لدى الشركات الفلسطينية لشريك واحد قادر على تغطية الجوانب القانونية والمؤسسية والبشرية معًا، بدلاً من التعامل مع أطراف متفرقة لكل جانب على حدة.

يلتزم كيان NHR بأعلى معايير حماية البيانات، وبالتوافق التام مع قانون العمل الفلسطيني، ويقدم حلولاً تمتد من إدارة ملفات الموظفين وحتى أتمتة الرواتب والتقارير الإدارية.', '{"name":"فريحات جروب","title":"الإدارة العامة"}'::jsonb, 'news', '/brand/logo-nhr.png', '2026-06-15', 0),
('seed-5', 'براءات الاختراع: الفرق بين الحماية المحلية والدولية', 'تسجيل براءة اختراع محليًا يمنحك حماية داخل حدود دولة واحدة فقط. تعرف على الفروقات الجوهرية وكيفية اختيار المسار الأنسب لابتكارك.', 'يخلط كثير من المبتكرين وأصحاب الشركات الناشئة بين الحماية المحلية والدولية لبراءات الاختراع، مما قد يعرّض ابتكاراتهم لخطر التقليد في أسواق لم تشملها الحماية.

الحماية المحلية تمنح صاحب الابتراع حقًا حصريًا داخل حدود الدولة التي سُجّلت فيها البراءة فقط، بينما تتيح الأنظمة الدولية تقديم طلب موحد يُفتح لاحقًا في عدة دول أعضاء، مع الاحتفاظ بتاريخ أولوية الطلب الأصلي.

اختيار المسار الأنسب يعتمد على طبيعة الابتكار، والأسواق المستهدفة للتصنيع أو البيع، والميزانية المخصصة لإجراءات التسجيل والمتابعة القانونية.

فريق فريحات لخدمات الملكية الفكرية يساعد المخترعين والشركات على تقييم ابتكاراتهم واختيار استراتيجية الحماية الأمثل محليًا ودوليًا.', '{"name":"المحامية سارة","title":"رئيسة قسم الملكية الفكرية والخدمات الدولية"}'::jsonb, 'ip', '/brand/ip-collage-patents.png', '2026-05-30', 0),
('seed-6', 'تأسيس الشركات في فلسطين: الدليل القانوني الكامل', 'من اختيار الشكل القانوني الأنسب وحتى استخراج التراخيص، نستعرض المسار الكامل لتأسيس شركة في فلسطين وأبرز النقاط التي يغفل عنها المؤسسون.', 'يبدأ تأسيس أي شركة في فلسطين باختيار الشكل القانوني الأنسب — شركة مساهمة، أو شركة ذات مسؤولية محدودة، أو شركة تضامن — بناءً على طبيعة النشاط وعدد الشركاء والرؤية المستقبلية للنمو والتمويل.

بعد اختيار الشكل القانوني، تأتي مرحلة صياغة عقد التأسيس والنظام الداخلي بدقة، لتفادي أي خلافات مستقبلية بين الشركاء حول الحصص والصلاحيات وآلية توزيع الأرباح.

يلي ذلك استكمال إجراءات التسجيل لدى الجهات الرسمية المختصة، واستخراج التراخيص القطاعية اللازمة، وفتح السجلات الضريبية والتأمينية.

يرافق فريحات للمحاماة والاستشارات المؤسسين في كل خطوة من هذا المسار، لضمان تأسيس قانوني سليم يحمي حقوقهم منذ اليوم الأول.', '{"name":"المحامية أسيل","title":"رئيسة قسم الشركات والخدمات المحلية"}'::jsonb, 'legal', '/brand/office-height-1.jpg', '2026-05-12', 0)
on conflict (id) do nothing;

