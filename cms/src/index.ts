import type { Core } from "@strapi/strapi";
import fs from "node:fs";
import path from "node:path";

const PUBLIC_ACTIONS = ["find", "findOne"];
const PUBLIC_TYPES = [
  "api::post.post",
  "api::author.author",
  "api::category.category",
  "api::tag.tag",
];

/** Grant the Public role read-only access to the blog content types. */
async function setPublicPermissions(strapi: Core.Strapi) {
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });
  if (!publicRole) return;

  for (const uid of PUBLIC_TYPES) {
    for (const action of PUBLIC_ACTIONS) {
      const actionId = `${uid}.${action}`;
      const existing = await strapi.db
        .query("plugin::users-permissions.permission")
        .findOne({ where: { action: actionId, role: publicRole.id } });
      if (!existing) {
        await strapi.db.query("plugin::users-permissions.permission").create({
          data: { action: actionId, role: publicRole.id },
        });
        strapi.log.info(`[bootstrap] public permission granted: ${actionId}`);
      }
    }
  }
}

const seedDir = path.join(process.cwd(), "data", "seed");

async function uploadSeedImage(
  strapi: Core.Strapi,
  file: string,
  name: string,
  alt: string
) {
  const existing = await strapi.db
    .query("plugin::upload.file")
    .findOne({ where: { name } });
  if (existing) return existing;

  const filePath = path.join(seedDir, file);
  const stats = fs.statSync(filePath);
  const [uploaded] = await strapi
    .plugin("upload")
    .service("upload")
    .upload({
      data: { fileInfo: { name, alternativeText: alt, caption: alt } },
      files: {
        filepath: filePath,
        originalFileName: name,
        mimetype: "image/png",
        size: stats.size,
      },
    });
  return uploaded;
}

/** One published post + its author/category/tags, so the frontend renders end-to-end. */
async function seedExampleData(strapi: Core.Strapi) {
  const count = await strapi.db.query("api::post.post").count();
  if (count > 0) return;

  strapi.log.info("[bootstrap] seeding example blog content...");

  const cover = await uploadSeedImage(
    strapi,
    "cover.png",
    "insights-cover.png",
    "Dubai skyline at night, viewed from the water"
  );
  const avatar = await uploadSeedImage(
    strapi,
    "avatar.png",
    "author-avatar.png",
    "Tasama Management Consultancy"
  );

  const category = await strapi.documents("api::category.category").create({
    data: {
      name: "Operational Strategy",
      slug: "operational-strategy",
      description: "Turning strategy into a repeatable operating rhythm.",
    },
  });

  const tagIds: Array<string | number> = [];
  for (const name of ["Restructuring", "Resilience", "Change Management"]) {
    const tag = await strapi.documents("api::tag.tag").create({
      data: { name, slug: name.toLowerCase().replace(/\s+/g, "-") },
    });
    tagIds.push(tag.id);
  }

  const author = await strapi.documents("api::author.author").create({
    data: {
      name: "Amara Osei",
      slug: "amara-osei",
      jobTitle: "Principal, Operations Practice",
      bio: "Amara leads operational turnaround engagements for mid-market firms across the GCC and East Africa.",
      credentials:
        "MBA (INSEAD). 14 years in management consulting, previously a Big Four restructuring lead.",
      knowsAbout: [
        "operational restructuring",
        "cost transformation",
        "organisational design",
        "change management",
      ],
      linkedinURL: "https://www.linkedin.com/company/tasama-management-consultancy",
      websiteURL: "https://tasamaconsultancy.com",
      avatar: avatar.id,
    },
  });

  const content = fs.readFileSync(path.join(seedDir, "post.md"), "utf8");

  await strapi.documents("api::post.post").create({
    status: "published",
    data: {
      title: "Restructuring for Resilience: A Field Guide for Mid-Market Firms",
      slug: "restructuring-for-resilience",
      excerpt:
        "A practical sequence for cutting structural cost without hollowing out the capabilities that drive recovery.",
      content,
      coverImage: cover.id,
      coverImageAlt: "Dubai skyline at night, viewed from the water",
      tldr:
        "Resilient restructuring protects three things while it cuts: the demand-facing edge, the data that runs the business, and the managers who hold institutional memory. Sequence the programme as diagnose, stabilise, redesign, hardwire, and govern it on a weekly cadence.",
      keyPoints: [
        { text: "Separate structural cost (permanent) from cyclical cost (temporary) before setting targets." },
        { text: "Protect revenue-generating and data-integrity roles from across-the-board cuts." },
        { text: "Run the programme on a weekly operating cadence with a single accountable owner." },
        { text: "Hardwire the new structure into budgets and role descriptions within one quarter, or it reverts." },
      ],
      faq: [
        {
          question: "How long does a mid-market restructuring take?",
          answer:
            "A focused programme runs 12 to 16 weeks from diagnosis to a hardwired operating model. Deeper redesigns that touch legal entities or core systems run two to three quarters.",
        },
        {
          question: "What is the most common restructuring mistake?",
          answer:
            "Applying an across-the-board headcount cut. It removes cost evenly but capability unevenly, and it usually strips out the revenue-facing and data-integrity roles a firm needs in order to recover.",
        },
      ],
      sources: [
        {
          label: "Getting Reorgs Right",
          url: "https://hbr.org/2016/11/getting-reorgs-right",
          publisher: "Harvard Business Review",
        },
      ],
      category: category.id,
      tags: tagIds,
      author: author.id,
      readingTimeMinutes: 7,
      featured: true,
      dateReviewed: new Date().toISOString().slice(0, 10),
      seo: {
        metaTitle: "Restructuring for Resilience: A Field Guide for Mid-Market Firms",
        metaDescription:
          "A practical, sequenced approach to structural cost reduction that protects the capabilities mid-market firms need in order to recover and grow.",
        keywords:
          "restructuring, operational resilience, cost transformation, mid-market, change management",
        metaRobots: "index, follow",
        structuredDataType: "BlogPosting",
        ogTitle: "Restructuring for Resilience: A Field Guide",
        ogDescription:
          "Cut structural cost without hollowing out the capabilities that drive recovery.",
      },
    },
  });

  strapi.log.info("[bootstrap] seed complete.");
}

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await setPublicPermissions(strapi);
    try {
      await seedExampleData(strapi);
    } catch (err) {
      strapi.log.error(`[bootstrap] seed failed: ${(err as Error).message}`);
    }
  },
};
