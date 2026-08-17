/**
 * Seed script for Arbee Constructions DB
 * Data sourced from: if0_42558079_arbee MySQL dump (Aug 10, 2026)
 *
 * Run: npm run db:seed
 */
import { PrismaClient, ProjectStatus, BlogStatus, ContactStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱  Seeding database...");

  // ── Clean slate ──────────────────────────────────────────────────────────
  await prisma.projectImage.deleteMany();
  await prisma.project.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.contactSubmission.deleteMany();

  console.log("  ✓ Cleared existing data");

  // ── Projects ─────────────────────────────────────────────────────────────
  await seedProjects();
  console.log("  ✓ Projects seeded");

  // ── Project Images ────────────────────────────────────────────────────────
  await seedProjectImages();
  console.log("  ✓ Project images seeded");

  // ── Blogs ─────────────────────────────────────────────────────────────────
  await seedBlogs();
  console.log("  ✓ Blogs seeded");

  // ── Contact Submissions ───────────────────────────────────────────────────
  await seedContacts();
  console.log("  ✓ Contact submissions seeded");

  console.log("\n✅  Seeding complete.");
}

// ── Projects data (from MySQL dump, ids preserved) ──────────────────────────
async function seedProjects() {
  const projects = [
    {
      id: 9,
      name: "G+1 Residence",
      description:
        "Our latest ongoing project at Deepam Nagar, Irugur, is a masterclass in collaborative design and architectural precision.",
      highlights:
        "3,000 sq. ft. G+1 residential residence\nBlank canvas approach shaped by client discussions\nSeamlessly woven Vastu principles into modern aesthetic\nPrioritizes harmony, natural light, and positive energy",
      projectDetails:
        "Our latest ongoing project at Deepam Nagar, Irugur, is a masterclass in collaborative design and architectural precision. This 3,000 sq. ft., G+1 residential residence was born from a blank canvas approach, shaped by endless, thoughtful discussions with our clients to ensure every square foot reflects their unique vision and lifestyle. By starting from scratch, we were able to seamlessly weave traditional Vastu principles into a modern aesthetic, creating a home that prioritizes harmony, natural light, and positive energy. At Arbee Constructions, we aren't just building a house in Irugur; we are meticulously crafting a dream home that is as functional as it is personal, ensuring the final structure is exactly how the family imagined it would be.",
      completion: "ongoing",
      category: "Residential",
      status: ProjectStatus.ongoing,
    },
    {
      id: 10,
      name: "SAI HALL",
      description:
        "Built using exposed Porotherm bricks. Blocks provide exceptional thermal insulation.",
      highlights:
        "Built using exposed Porotherm bricks intentionally left raw\nExceptional thermal insulation keeping the hall naturally cool\nTimeless and grounded structure honoring material honesty\nDesigned for meditation and prayer",
      projectDetails:
        "Our work on the Sai Prayer Hall is a profound example of how architecture can evoke a sense of peace and permanence. Built to be both quality-driven and priceless, this space was built using exposed Porotherm bricks, intentionally left raw to celebrate their natural, earthy texture. This aesthetic choice does more than just looking beautiful. The clay-based blocks provide exceptional thermal insulation, keeping the hall naturally cool and serene for meditation and prayer. By honoring the honesty of the materials, we've created a structure that feels timeless and grounded.",
      completion: "Completed 2022",
      category: "Assembly Building",
      status: ProjectStatus.completed,
    },
    {
      id: 11,
      name: "Mr.Durai & Sudha residence",
      description:
        "2,200 sq. ft. ground-floor home. We focused on smart planning to make the home feel open.",
      highlights:
        "2,200 sq. ft. ground-floor home\nSmart planning for open, airy feel\nFull of natural light throughout\nSpacious easy-to-navigate layout perfect for family",
      projectDetails:
        "Our project at AG Pudur is a beautiful example of how a 2,200 sq. ft. ground-floor home can offer both comfort and elegance. By keeping everything on one level, we've created a spacious, easy-to-navigate layout that is perfect for their family. We focused on smart planning to make the home feel open, airy, and full of natural light. At Arbee Constructions, we took pride in turning this 2,200 sq. ft. space into a solid, high-quality residence where every room feels connected, making daily living simple and enjoyable.",
      completion: "Completed 2022",
      category: "Residential",
      status: ProjectStatus.completed,
    },
    {
      id: 12,
      name: "Hostel building",
      description:
        "A G+2 structure that could seamlessly function as a luxury individual residence. A service apartment.",
      highlights:
        "G+2 structure near the airport\nUniversal plan for luxury residence, service apartment, or hostel\nPile foundation for absolute structural integrity\nMaximized utility within Airport Authority height restrictions",
      projectDetails:
        "This project near the airport, commissioned by Mr. Kuppusamy, represents one of our most versatile design achievements to date. Located in a prestigious, high-demand neighbourhood, the challenge was to create a G+2 structure that could seamlessly function as a luxury individual residence, a service apartment, or a high-end hostel. After numerous collaborative sessions and exploring various layout options, we developed a \"universal\" plan that perfectly satisfied all three potential uses without compromising on space or comfort. Navigating the strict Airport Authority height restrictions, we engineered a sophisticated design that maximizes utility within the permitted elevation. To ensure absolute structural integrity in this prime location, we utilized a pile foundation, providing a rock-solid base for a building designed to adapt to the owner's changing needs for decades to come.",
      completion: "Completed 2020",
      category: "Institutional Building",
      status: ProjectStatus.completed,
    },
    {
      id: 13,
      name: "G+2 commercial complex on Pollachi",
      description:
        "The vertical space to create a highly functional and visible landmark along this busy corridor.",
      highlights:
        "G+2 commercial complex on Pollachi Main Road\nMaximized vertical space on compact site\nHighly functional and visible landmark\nSleek, professional look that stands out to passing traffic",
      projectDetails:
        "Our G+2 commercial complex on Pollachi Main Road is a prime example of how smart engineering can unlock the full potential of a compact site. Despite the limited footprint, we maximized the vertical space to create a highly functional and visible landmark along this busy corridor. The design focuses on maximizing floor area and ensuring easy accessibility for businesses, all while maintaining a sleek, professional look that stands out to passing traffic. At Arbee Constructions, we took pride in turning a challenging site into a high-value commercial space, proving that even a small plot can be transformed into a successful, multi-level commercial destination.",
      completion: "Completed 2019",
      category: "Commercial",
      status: ProjectStatus.completed,
    },
    {
      id: 14,
      name: "Venkitapuram – industrial building",
      description:
        "3,200 sq. ft. industrial project. A high-capacity warehouse, or a specialized spinning mill.",
      highlights:
        "3,200 sq. ft. industrial project at Venkitapuram, Coimbatore\nMulti-purpose structure for workshop, warehouse, or spinning mill\nVersatile open-floor layout with high-load bearing capacities\nBuilt for heavy machinery and organized storage",
      projectDetails:
        "Our 3,200 sq. ft. industrial project at Venkitapuram, Chinniyampalayam, Coimbatore, showcases our ability to build with the future in mind. This multi-purpose structure was engineered for ultimate flexibility, designed to adapt seamlessly to the unique demands of an industrial workshop, a high-capacity warehouse, or a specialized spinning mill. By focusing on a versatile open-floor layout and high-load bearing capacities, we've created a space that can evolve alongside our client's business needs. Whether it's accommodating heavy machinery or organized storage, this building stands as a robust and efficient hub in the heart of Coimbatore's industrial landscape, built with the precision and strength that Arbee Constructions is known for.",
      completion: "Completed 2022",
      category: "Industrial",
      status: ProjectStatus.completed,
    },
    {
      id: 15,
      name: "Meraki cottage house",
      description:
        "Classic sloping roof and Mangalore clay tiles.",
      highlights:
        "Boutique stay in Walayar with heritage charm and contemporary comfort\nTraditional exterior with classic sloping roof and Mangalore clay tiles\nLaterite cladding and cobblestone flooring in parking area\nStrategically positioned with backyard facing the Western Ghats",
      projectDetails:
        "The Meraki Cottage in Walayar is a boutique stay designed to offer guests a unique blend of heritage charm and contemporary comfort, featuring a traditional exterior defined by its classic sloping roof and Mangalore clay tiles. While the facade honors local vernacular architecture with the laterite cladding and the cobble stone for the flooring in the parking area to enhance its unique experience, the interior transitions into a sleek, modern space curated for a premium guest experience. The cottage is strategically positioned to serve as a viewing pavilion, where the highlight of the stay is the backyard's immediate and immersive proximity to the towering peaks of the Western Ghats.",
      completion: "Completed 2023",
      category: "Private Dwelling",
      status: ProjectStatus.completed,
    },
    {
      id: 17,
      name: "Prathu divi illam",
      description:
        "A residential project designed to enhance contemporary living by blending modern aesthetics with practical functionality.",
      highlights:
        "Located in Selvapuram, Coimbatore\nOptimized space, natural light, and connectivity\nOpen, adaptable layouts for resident personalization\nExpansive windows and attention to detail throughout",
      projectDetails:
        "This is a residential project designed to enhance contemporary living by blending modern aesthetics with practical functionality. Located in Selvapuram – Coimbatore, this project exemplifies a commitment to high-quality design, catering to the diverse needs of the Client. The design focuses on optimizing space, natural light, and connectivity to ensure a functional yet inviting living experience. Emphasizing open, adaptable layouts, the project offers residents the flexibility to personalize their living spaces. Architectural features such as expansive windows, efficient use of space, and attention to detail create a welcoming atmosphere that enhances daily living.",
      completion: "completed on 2023",
      category: "Residential",
      status: ProjectStatus.completed,
    },
    {
      id: 18,
      name: "y7 studio Interior Design",
      description: "y7 studio",
      highlights: "Interior design project completed 2025",
      projectDetails: "y7 studio interior design project completed in 2025.",
      completion: "completed on 2025",
      category: "Interior Designs",
      status: ProjectStatus.completed,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: project,
      create: project,
    });
  }
}

// ── Project Images (from MySQL dump) ─────────────────────────────────────────
async function seedProjectImages() {
  // Images with no project_id = standalone gallery images
  // Images with project_id = linked to a project
  const images: { id: number; projectId: number | null; imagePath: string; displayOrder: number }[] = [
    // Standalone gallery images
    { id: 83,  projectId: null, imagePath: "/images/img25.jpg",    displayOrder: 0  },
    { id: 84,  projectId: null, imagePath: "/images/img26.jpeg",   displayOrder: 1  },
    { id: 85,  projectId: null, imagePath: "/images/img27.jpeg",   displayOrder: 2  },
    { id: 89,  projectId: null, imagePath: "/images/img29.jpg",    displayOrder: 4  },
    { id: 92,  projectId: null, imagePath: "/images/img30.jpg",    displayOrder: 5  },
    { id: 93,  projectId: null, imagePath: "/images/img31.jpg",    displayOrder: 6  },
    { id: 108, projectId: null, imagePath: "/images/img37.jpg",    displayOrder: 12 },
    { id: 110, projectId: null, imagePath: "/images/img38.jpg",    displayOrder: 13 },
    { id: 111, projectId: null, imagePath: "/images/img39.jpg",    displayOrder: 14 },
    { id: 112, projectId: null, imagePath: "/images/img40.jpg",    displayOrder: 15 },
    { id: 113, projectId: null, imagePath: "/images/img41.jpg",    displayOrder: 16 },
    { id: 120, projectId: null, imagePath: "/images/img42.jpeg",   displayOrder: 17 },
    { id: 121, projectId: null, imagePath: "/images/img43.png",    displayOrder: 18 },
    { id: 126, projectId: null, imagePath: "/images/img44.png",    displayOrder: 19 },
    { id: 127, projectId: null, imagePath: "/images/img45.jpg",    displayOrder: 20 },
    { id: 128, projectId: null, imagePath: "/images/img46.jpg",    displayOrder: 21 },
    { id: 133, projectId: null, imagePath: "/images/img47.png",    displayOrder: 22 },
    { id: 136, projectId: null, imagePath: "/images/img48.jpeg",   displayOrder: 23 },
    { id: 137, projectId: null, imagePath: "/images/img49.jpeg",   displayOrder: 24 },
    { id: 138, projectId: null, imagePath: "/images/img50.jpeg",   displayOrder: 25 },
    { id: 139, projectId: null, imagePath: "/images/img51.jpeg",   displayOrder: 26 },
    { id: 140, projectId: null, imagePath: "/images/img52.jpeg",   displayOrder: 27 },
    { id: 141, projectId: null, imagePath: "/images/img53.jpeg",   displayOrder: 28 },
    { id: 142, projectId: null, imagePath: "/images/img54.jpeg",   displayOrder: 29 },
    { id: 143, projectId: null, imagePath: "/images/img55.jpeg",   displayOrder: 30 },
    { id: 160, projectId: null, imagePath: "/images/img56.jpg",    displayOrder: 31 },
    { id: 161, projectId: null, imagePath: "/images/img57.jpg",    displayOrder: 32 },
    { id: 162, projectId: null, imagePath: "/images/img58.jpg",    displayOrder: 33 },
    { id: 163, projectId: null, imagePath: "/images/img59.jpg",    displayOrder: 34 },
    { id: 164, projectId: null, imagePath: "/images/img60.jpg",    displayOrder: 35 },
    { id: 165, projectId: null, imagePath: "/images/img61.jpg",    displayOrder: 36 },
    { id: 166, projectId: null, imagePath: "/images/img62.jpg",    displayOrder: 37 },
    { id: 188, projectId: null, imagePath: "/images/img63.png",    displayOrder: 38 },
    { id: 189, projectId: null, imagePath: "/images/img64.png",    displayOrder: 39 },
    { id: 190, projectId: null, imagePath: "/images/img65.png",    displayOrder: 40 },
    { id: 197, projectId: null, imagePath: "/images/img67.jpg",    displayOrder: 42 },
    { id: 198, projectId: null, imagePath: "/images/img68.jpg",    displayOrder: 43 },
    { id: 199, projectId: null, imagePath: "/images/img69.jpg",    displayOrder: 44 },
    { id: 200, projectId: null, imagePath: "/images/img70.jpg",    displayOrder: 45 },
    { id: 201, projectId: null, imagePath: "/images/img71.jpg",    displayOrder: 46 },
    { id: 202, projectId: null, imagePath: "/images/img72.jpg",    displayOrder: 47 },
    { id: 204, projectId: null, imagePath: "/images/img74.jpg",    displayOrder: 49 },
    { id: 205, projectId: null, imagePath: "/images/img75.jpg",    displayOrder: 50 },
    { id: 206, projectId: null, imagePath: "/images/img76.jpg",    displayOrder: 51 },
    { id: 207, projectId: null, imagePath: "/images/img77.jpg",    displayOrder: 52 },
    { id: 208, projectId: null, imagePath: "/images/img78.jpg",    displayOrder: 53 },
    { id: 222, projectId: null, imagePath: "/images/img79.jpg",    displayOrder: 54 },
    { id: 224, projectId: null, imagePath: "/images/img81.jpg",    displayOrder: 56 },
    { id: 225, projectId: null, imagePath: "/images/img82.jpg",    displayOrder: 57 },
    { id: 226, projectId: null, imagePath: "/images/img83.jpg",    displayOrder: 58 },
    { id: 227, projectId: null, imagePath: "/images/img84.jpg",    displayOrder: 59 },
    { id: 228, projectId: null, imagePath: "/images/img85.jpg",    displayOrder: 60 },
    { id: 229, projectId: null, imagePath: "/images/img86.jpg",    displayOrder: 61 },
    { id: 230, projectId: null, imagePath: "/images/img87.jpg",    displayOrder: 62 },
    { id: 231, projectId: null, imagePath: "/images/img88.jpg",    displayOrder: 63 },
    { id: 232, projectId: null, imagePath: "/images/img89.jpg",    displayOrder: 64 },
    { id: 233, projectId: null, imagePath: "/images/img90.jpg",    displayOrder: 65 },
    { id: 234, projectId: null, imagePath: "/images/img91.jpg",    displayOrder: 66 },
    { id: 235, projectId: null, imagePath: "/images/img92.jpg",    displayOrder: 67 },
    { id: 250, projectId: null, imagePath: "/images/img93.jpg",    displayOrder: 68 },
    { id: 251, projectId: null, imagePath: "/images/img94.jpg",    displayOrder: 69 },
    { id: 268, projectId: null, imagePath: "/images/img95.jpg",    displayOrder: 70 },
    { id: 269, projectId: null, imagePath: "/images/img96.jpg",    displayOrder: 71 },
    { id: 273, projectId: null, imagePath: "/images/img97.png",    displayOrder: 72 },
    { id: 290, projectId: null, imagePath: "/images/img98.jpg",    displayOrder: 73 },
    { id: 292, projectId: null, imagePath: "/images/img99.jpeg",   displayOrder: 74 },
    { id: 299, projectId: null, imagePath: "/images/img100.png",   displayOrder: 75 },
    { id: 332, projectId: null, imagePath: "/images/img101.jpg",   displayOrder: 76 },
    { id: 333, projectId: null, imagePath: "/images/img102.jpg",   displayOrder: 77 },
    { id: 334, projectId: null, imagePath: "/images/img103.jpg",   displayOrder: 78 },
    { id: 335, projectId: null, imagePath: "/images/img104.jpg",   displayOrder: 79 },
    { id: 336, projectId: null, imagePath: "/images/img105.jpg",   displayOrder: 80 },
    { id: 337, projectId: null, imagePath: "/images/img106.jpg",   displayOrder: 81 },
    { id: 338, projectId: null, imagePath: "/images/img107.jpg",   displayOrder: 82 },
    { id: 339, projectId: null, imagePath: "/images/img108.jpg",   displayOrder: 83 },
    { id: 340, projectId: null, imagePath: "/images/img109.jpg",   displayOrder: 84 },
    { id: 341, projectId: null, imagePath: "/images/img110.jpg",   displayOrder: 85 },
    { id: 342, projectId: null, imagePath: "/images/img111.jpg",   displayOrder: 86 },
    { id: 354, projectId: null, imagePath: "/images/img112.png",   displayOrder: 87 },
    // Project 9 — G+1 Residence
    { id: 86,  projectId: 9,   imagePath: "/images/img26.jpeg",   displayOrder: 0  },
    { id: 87,  projectId: 9,   imagePath: "/images/img27.jpeg",   displayOrder: 1  },
    // Project 10 — SAI HALL
    { id: 343, projectId: 10,  imagePath: "/images/img101.jpg",   displayOrder: 0  },
    { id: 344, projectId: 10,  imagePath: "/images/img102.jpg",   displayOrder: 1  },
    { id: 345, projectId: 10,  imagePath: "/images/img103.jpg",   displayOrder: 2  },
    { id: 346, projectId: 10,  imagePath: "/images/img104.jpg",   displayOrder: 3  },
    { id: 347, projectId: 10,  imagePath: "/images/img105.jpg",   displayOrder: 4  },
    { id: 348, projectId: 10,  imagePath: "/images/img106.jpg",   displayOrder: 5  },
    { id: 349, projectId: 10,  imagePath: "/images/img107.jpg",   displayOrder: 6  },
    { id: 350, projectId: 10,  imagePath: "/images/img108.jpg",   displayOrder: 7  },
    { id: 351, projectId: 10,  imagePath: "/images/img109.jpg",   displayOrder: 8  },
    { id: 352, projectId: 10,  imagePath: "/images/img110.jpg",   displayOrder: 9  },
    { id: 353, projectId: 10,  imagePath: "/images/img111.jpg",   displayOrder: 10 },
    // Project 11 — Mr.Durai & Sudha residence
    { id: 293, projectId: 11,  imagePath: "/images/img30.jpg",    displayOrder: 0  },
    { id: 294, projectId: 11,  imagePath: "/images/img31.jpg",    displayOrder: 1  },
    { id: 295, projectId: 11,  imagePath: "/images/img63.png",    displayOrder: 2  },
    { id: 296, projectId: 11,  imagePath: "/images/img64.png",    displayOrder: 3  },
    { id: 297, projectId: 11,  imagePath: "/images/img65.png",    displayOrder: 4  },
    { id: 298, projectId: 11,  imagePath: "/images/img99.jpeg",   displayOrder: 5  },
    // Project 12 — Hostel building
    { id: 313, projectId: 12,  imagePath: "/images/img44.png",    displayOrder: 0  },
    { id: 314, projectId: 12,  imagePath: "/images/img45.jpg",    displayOrder: 1  },
    { id: 315, projectId: 12,  imagePath: "/images/img46.jpg",    displayOrder: 2  },
    // Project 13 — G+2 commercial complex
    { id: 134, projectId: 13,  imagePath: "/images/img43.png",    displayOrder: 0  },
    { id: 135, projectId: 13,  imagePath: "/images/img47.png",    displayOrder: 1  },
    // Project 14 — Venkitapuram industrial
    { id: 270, projectId: 14,  imagePath: "/images/img37.jpg",    displayOrder: 0  },
    { id: 271, projectId: 14,  imagePath: "/images/img95.jpg",    displayOrder: 1  },
    { id: 272, projectId: 14,  imagePath: "/images/img96.jpg",    displayOrder: 2  },
    // Project 15 — Meraki cottage
    { id: 316, projectId: 15,  imagePath: "/images/img79.jpg",    displayOrder: 0  },
    { id: 317, projectId: 15,  imagePath: "/images/img81.jpg",    displayOrder: 1  },
    { id: 318, projectId: 15,  imagePath: "/images/img82.jpg",    displayOrder: 2  },
    { id: 319, projectId: 15,  imagePath: "/images/img83.jpg",    displayOrder: 3  },
    { id: 320, projectId: 15,  imagePath: "/images/img84.jpg",    displayOrder: 4  },
    { id: 321, projectId: 15,  imagePath: "/images/img85.jpg",    displayOrder: 5  },
    { id: 322, projectId: 15,  imagePath: "/images/img86.jpg",    displayOrder: 6  },
    { id: 323, projectId: 15,  imagePath: "/images/img87.jpg",    displayOrder: 7  },
    { id: 324, projectId: 15,  imagePath: "/images/img88.jpg",    displayOrder: 8  },
    { id: 325, projectId: 15,  imagePath: "/images/img89.jpg",    displayOrder: 9  },
    { id: 326, projectId: 15,  imagePath: "/images/img90.jpg",    displayOrder: 10 },
    { id: 327, projectId: 15,  imagePath: "/images/img91.jpg",    displayOrder: 11 },
    { id: 328, projectId: 15,  imagePath: "/images/img92.jpg",    displayOrder: 12 },
    { id: 329, projectId: 15,  imagePath: "/images/img93.jpg",    displayOrder: 13 },
    { id: 330, projectId: 15,  imagePath: "/images/img94.jpg",    displayOrder: 14 },
    { id: 331, projectId: 15,  imagePath: "/images/img97.png",    displayOrder: 15 },
    // Project 17 — Prathu divi illam
    { id: 152, projectId: 17,  imagePath: "/images/img48.jpeg",   displayOrder: 0  },
    { id: 153, projectId: 17,  imagePath: "/images/img49.jpeg",   displayOrder: 1  },
    { id: 154, projectId: 17,  imagePath: "/images/img50.jpeg",   displayOrder: 2  },
    { id: 155, projectId: 17,  imagePath: "/images/img51.jpeg",   displayOrder: 3  },
    { id: 156, projectId: 17,  imagePath: "/images/img52.jpeg",   displayOrder: 4  },
    { id: 157, projectId: 17,  imagePath: "/images/img53.jpeg",   displayOrder: 5  },
    { id: 158, projectId: 17,  imagePath: "/images/img54.jpeg",   displayOrder: 6  },
    { id: 159, projectId: 17,  imagePath: "/images/img55.jpeg",   displayOrder: 7  },
    // Project 18 — y7 studio
    { id: 363, projectId: 18,  imagePath: "/images/img56.jpg",    displayOrder: 0  },
    { id: 364, projectId: 18,  imagePath: "/images/img57.jpg",    displayOrder: 1  },
    { id: 365, projectId: 18,  imagePath: "/images/img58.jpg",    displayOrder: 2  },
    { id: 366, projectId: 18,  imagePath: "/images/img59.jpg",    displayOrder: 3  },
    { id: 367, projectId: 18,  imagePath: "/images/img60.jpg",    displayOrder: 4  },
    { id: 368, projectId: 18,  imagePath: "/images/img61.jpg",    displayOrder: 5  },
    { id: 369, projectId: 18,  imagePath: "/images/img62.jpg",    displayOrder: 6  },
  ];

  for (const img of images) {
    await prisma.projectImage.upsert({
      where: { id: img.id },
      update: img,
      create: img,
    });
  }
}

// ── Blogs (from MySQL dump — id 2 "Quality of Bricks") ───────────────────────
async function seedBlogs() {
  await prisma.blog.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      title: "Quality of Bricks",
      slug: "quality-of-bricks",
      excerpt:
        "Bricks should be uniform in color, size and shape. Standard size of brick should be maintained.",
      content: `# Quality of Bricks

Bricks should be uniform in color, size and shape. Standard size of brick should be maintained.

They should be sound and compact. They should be free from cracks and other flaws such as air bubbles, stone nodules etc. with sharp and square edges.

Bricks should not absorb more than 1/5 of their own weight of water when immersed in water for 24 hours (15% to 20% of dry weight).

The compressive strength of bricks should be in range of 2000 to 5000 psi (15 to 35 MPa).

Salt attack hampers the durability of brick. The presence of excess soluble salts in brick also causes efflorescence. The percentage of soluble salts (sulphates of calcium, magnesium, sodium and potassium) should not exceed 2.5% in brunt bricks.

Brick should not change in volume when wetted. Bricks should neither overburnt nor underbrunt.

Generally, the weight per brick should be 6 lbs. and the unit weight should be less than 125 lbs. per cubic ft.

The thermal conductivity of bricks should be low as it is desirable that the building built with them should be cool in summer and warm in winter.

Bricks should be sound proof. Bricks should be non-inflammable.`,
      featuredImage: "img42.jpeg",
      category: "Construction Tips",
      author: "Nikil Ravi",
      status: BlogStatus.published,
      views: 26,
      createdAt: new Date("2026-01-11T22:13:05.000Z"),
      updatedAt: new Date("2026-08-02T00:22:26.000Z"),
    },
  });
}

// ── Contact Submissions (from MySQL dump) ────────────────────────────────────
async function seedContacts() {
  const contacts = [
    {
      id: 1,
      name: "Navaneeth NN",
      email: "nnnavaneeth171@gmail.com",
      mobile: "6383596202",
      message: "Hi",
      status: ContactStatus.read,
      createdAt: new Date("2026-01-11T23:33:44.000Z"),
    },
    {
      id: 2,
      name: "NAVANEETH NN",
      email: "nnnavaneeth171@gmail.com",
      mobile: "6383596202",
      message: "test",
      status: ContactStatus.read,
      createdAt: new Date("2026-01-13T06:15:41.000Z"),
    },
    {
      id: 3,
      name: "Keerthana",
      email: "keerthana5403@gmail.com",
      mobile: "7339462255",
      message: "Dear sir pls guide me for a residential building",
      status: ContactStatus.read,
      createdAt: new Date("2026-01-19T07:22:07.000Z"),
    },
    {
      id: 4,
      name: "JARVIS CHELLI ZELIG R",
      email: "rajknexus@gmail.com",
      mobile: "9361693749",
      message:
        "Hello sir!!\n\nWe the RAJ'K NEXUS... We are a trusted material supplier across Tamil Nadu.\nFor all material requirements, please contact us.\nLet us build a successful business together.\nKindly acknowledge our service.\nThank you",
      status: ContactStatus.read,
      createdAt: new Date("2026-01-20T22:09:35.000Z"),
    },
  ];

  for (const contact of contacts) {
    await prisma.contactSubmission.upsert({
      where: { id: contact.id },
      update: {},
      create: contact,
    });
  }
}

// ── Run ───────────────────────────────────────────────────────────────────────
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
