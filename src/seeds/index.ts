import { db } from "../config/db";
import {
	introduction_table,
	official_staff_table,
	director_message_table
} from "../modules/about_us/model";
import { hashPassword } from "../utils/helper";
import {
	act_table,
	regulation_table,
	procedure_table,
	directive_table
} from "../modules/act_directives/model";
import { scheduled_program_table } from "../modules/training_and_Programs/model";
import { admin_table } from "../modules/admin/model";
import { eq } from "drizzle-orm";
export async function seedAboutUs() {
	console.log("🌱 Seeding About Us data...");

	// Seed introduction
	await db.insert(introduction_table).values([
		{
			content_en: "Welcome to the Health Training Center, Koshi Province. We are committed to providing quality healthcare training and services to our community.",
			content_ne: "कोशी प्रदेश स्वास्थ्य तालिम केन्द्रमा स्वागत छ। हामी हाम्रो समुदायलाई गुणस्तरीय स्वास्थ्य सेवा तालिम र सेवा प्रदान गर्न प्रतिबद्ध छौं।"
		},
		{
			content_en: "Our mission is to enhance healthcare delivery through comprehensive training programs and professional development.",
			content_ne: "हाम्रो मिशन व्यापक तालिम कार्यक्रमहरू र व्यावसायिक विकास मार्फत स्वास्थ्य सेवा वितरण सुधार गर्नु हो।"
		}
	]);

	// Seed official staff
	await db.insert(official_staff_table).values([
		{
			name_en: "Bipin Kumar Sah",
			name_ne: "बिपिन कुमार साह",
			position_en: "Director",
			position_ne: "स्वास्थ्य शिक्षा प्रशासक",
			email: "bipin.sah@healthtraining.gov.np",
			phone: "9846728260",
			photo_url: "uploads/staff_official_staff/director_0.webp"
		},
		{
			name_en: "Anil Kumar Chaudhary",
			name_ne: "अनिल कुमार चौधरी",
			position_en: "Senior Training Officer",
			position_ne: "वरिष्ठ स्वास्थ्य शिक्षा अधिकृत",
			email: "anil.chaudhary@healthtraining.gov.np",
			phone: "9851146038",
			photo_url: "uploads/staff_official_staff/0.webp"
		},
		{
			name_en: "Harish Bahadur Chand",
			name_ne: "हरिश बहादुर चाँद",
			position_en: "Training Officer",
			position_ne: "स्वास्थ्य शिक्षा अधिकृत",
			email: "harish.chand@healthtraining.gov.np",
			phone: "9848858503",
			photo_url: "uploads/staff_official_staff/staff_Official_.webp"
		},
		{
			name_en: "Pradip Kumar Yadav",
			name_ne: "प्रदीप कुमार यादव",
			position_en: "Program Coordinator",
			position_ne: "सार्वजनिक स्वास्थ्य अधिकृत",
			email: "pradip.yadav@healthtraining.gov.np",
			phone: "9863445578",
			photo_url: ""
		},
		{
			name_en: "Sabina K.C.",
			name_ne: "सबिना केसी",
			position_en: "Program Coordinator",
			position_ne: "सार्वजनिक स्वास्थ्य अधिकृत",
			email: "sabina.kc@healthtraining.gov.np",
			phone: "",
			photo_url: ""
		},
		{
			name_en: "Girendra Kumar Jha",
			name_ne: "गिरेन्द्र कुमार झा",
			position_en: "Administrative Officer",
			position_ne: "सार्वजनिक स्वास्थ्य निरीक्षक",
			email: "girendra.jha@healthtraining.gov.np",
			phone: "9849447740",
			photo_url: ""
		},
		{
			name_en: "Ishwor Koirala",
			name_ne: "ईश्वर कोइराला",
			position_en: "IT Officer",
			position_ne: "आईटी सहायक",
			email: "ishwor.koirala@healthtraining.gov.np",
			phone: "9866052752",
			photo_url: ""
		},
		{
			name_en: "Ashish Yadav",
			name_ne: "आशिष यादव",
			position_en: "Administrative Officer",
			position_ne: "कार्यालय सहयोगी",
			email: "ashish.yadav@healthtraining.gov.np",
			phone: "9845492970",
			photo_url: ""
		},
		{
			name_en: "Bindu Tamang",
			name_ne: "बिन्दु तामाङ",
			position_en: "Administrative Officer",
			position_ne: "कार्यालय सहयोगी",
			email: "bindu.tamang@healthtraining.gov.np",
			phone: "9845841292",
			photo_url: ""
		},
		{
			name_en: "Madan Mestaf",
			name_ne: "मदन मेस्ताफ",
			position_en: "Administrative Officer",
			position_ne: "कार्यालय सहयोगी",
			email: "madan.mestaf@healthtraining.gov.np",
			phone: "9855035887",
			photo_url: ""
		},
		{
			name_en: "Lalbabu Raut Ahir",
			name_ne: "लालबाबु रौत अहीर",
			position_en: "Administrative Officer",
			position_ne: "चालक",
			email: "lalbabu.raut@healthtraining.gov.np",
			phone: "9855029097",
			photo_url: ""
		},
		{
			name_en: "Purna Prasad Dahal",
			name_ne: "पूर्ण प्रसाद दाहाल",
			position_en: "Administrative Officer",
			position_ne: "चालक",
			email: "purna.dahal@healthtraining.gov.np",
			phone: "9844182180",
			photo_url: ""
		}
	]);
	// Addd the director to update the data 
	const director = await db
		.select()
		.from(official_staff_table)
		.where(eq(official_staff_table.position_en, 'Director'))
		.limit(1);

	if (!director.length) {
		throw new Error('No Director found in staff table during seeding!');
	}
	// Seed director message with auto-found director ID
	await db.insert(director_message_table).values([
		{
			message_en: "As the Health Education Administrator of Koshi Province Health Training Center, I am honored to lead an institution dedicated to excellence in healthcare education and training. Our commitment to developing skilled healthcare professionals ensures better health outcomes for the communities we serve across Koshi Province.",
			message_ne: "कोशी प्रदेश स्वास्थ्य तालिम केन्द्रको स्वास्थ्य शिक्षा प्रशासकको हैसियतमा, स्वास्थ्य शिक्षा र तालिममा उत्कृष्टताका लागि समर्पित संस्थाको नेतृत्व गर्न पाउँदा म सम्मानित महसुस गर्छु। दक्ष स्वास्थ्यकर्मी विकास गर्ने हाम्रो प्रतिबद्धताले कोशी प्रदेशभर हामीले सेवा गर्ने समुदायहरूका लागि राम्रो स्वास्थ्य परिणाम सुनिश्चित गर्छ।",
			director_staff_id: director[0].id // Auto-found Director ID
		}
	]);
	console.log("✅ About Us data seeded successfully!");
}

export async function seedActivitiesDirectives() {
	console.log("🌱 Seeding Activities & Directives data...");

	// Seed acts
	await db.insert(act_table).values([
		{
			description_en: "Public Health Service Act 2075 - Establishing standards for public health services and training requirements.",
			description_ne: "सार्वजनिक स्वास्थ्य सेवा ऐन २०७५ - सार्वजनिक स्वास्थ्य सेवा र तालिम आवश्यकताहरूका लागि मापदण्डहरू स्थापना।"
		},
		{
			description_en: "Medical Education and Training Act 2076 - Guidelines for medical and healthcare training institutions.",
			description_ne: "चिकित्सा शिक्षा र तालिम ऐन २०७६ - चिकित्सा र स्वास्थ्य सेवा तालिम संस्थानहरूका लागि दिशानिर्देश।"
		}
	]);

	// Seed regulations
	await db.insert(regulation_table).values([
		{
			description_en: "Training Program Standards Regulation 2077 - Minimum requirements for healthcare training programs.",
			description_ne: "तालिम कार्यक्रम मापदण्ड नियमावली २०७७ - स्वास्थ्य सेवा तालिम कार्यक्रमहरूका न्यूनतम आवश्यकताहरू।"
		}
	]);

	// Seed procedures
	await db.insert(procedure_table).values([
		{
			description_en: "Training Registration Procedure - Step-by-step process for registering training programs and participants.",
			description_ne: "तालिम दर्ता प्रक्रिया - तालिम कार्यक्रम र सहभागीहरू दर्ताका लागि चरणबद्ध प्रक्रिया।"
		}
	]);

	// Seed directives
	await db.insert(directive_table).values([
		{
			description_en: "COVID-19 Training Safety Directive - Special guidelines for conducting training during pandemic.",
			description_ne: "कोभिड-१९ तालिम सुरक्षा निर्देशिका - महामारीको समयमा तालिम सञ्चालनका लागि विशेष दिशानिर्देश।"
		}
	]);

	console.log("✅ Activities & Directives data seeded successfully!");
}

export async function seedTrainingPrograms() {
	console.log("🌱 Seeding Training Programs data...");

	// Use existing images from uploads folder
	await db.insert(scheduled_program_table).values([
		{
			title: "Basic Health Care Training Workshop",
			event_date: new Date("2025-01-15T09:00:00.000Z"),
			event_venue: "Health Training Center, Main Hall",
			description: "Comprehensive training program covering basic healthcare practices, patient safety protocols, and emergency response procedures. This workshop is designed for new healthcare workers and volunteers.",
			added_images: [
				"uploads/training_programs/images/0_0.webp",
				"uploads/training_programs/images/1_0.webp"
			],
			thumbnail_image: "uploads/training_programs/images/1760972117595_thumbnail.webp"
		},
		{
			title: "Advanced Nursing Skills Development",
			event_date: new Date("2025-02-20T10:00:00.000Z"),
			event_venue: "Health Training Center, Room 201",
			description: "Advanced training focused on specialized nursing skills, critical care management, and patient assessment techniques. Designed for experienced nursing staff seeking professional development.",
			added_images: [
				"uploads/training_programs/images/0_0.webp",
				"uploads/training_programs/images/1_0.webp"
			],
			thumbnail_image: "uploads/training_programs/images/1760972178762_thumbnail.webp"
		},
		{
			title: "Emergency Response and First Aid Certification",
			event_date: new Date("2025-03-10T08:30:00.000Z"),
			event_venue: "Health Training Center, Simulation Lab",
			description: "Intensive certification program for emergency response and first aid. Includes hands-on practice with medical equipment, CPR training, and trauma response procedures.",
			added_images: [
				"uploads/training_programs/images/1_0.webp"
			],
			thumbnail_image: "uploads/training_programs/images/1760972117595_thumbnail.webp"
		},
		{
			title: "Public Health and Community Outreach",
			event_date: new Date("2025-04-05T09:30:00.000Z"),
			event_venue: "Health Training Center, Conference Room",
			description: "Training program focused on public health initiatives, community health assessment, disease prevention strategies, and health education techniques for community outreach programs.",
			added_images: [],
			thumbnail_image: "uploads/training_programs/images/0_0.webp"
		},
		{
			title: "Digital Health Records Management",
			event_date: new Date("2025-05-12T13:00:00.000Z"),
			event_venue: "Health Training Center, Computer Lab",
			description: "Modern training on electronic health records management, data privacy, digital documentation standards, and healthcare information systems.",
			added_images: [
				"uploads/training_programs/images/0_0.webp",
				"uploads/training_programs/images/1760972178762_thumbnail.webp"
			],
			thumbnail_image: "uploads/training_programs/images/1_0.webp"
		}
	]);

	console.log("✅ Training Programs data seeded successfully!");
}

export async function seedAdminUsers() {
	console.log("🌱 Seeding Admin User data...");

	// Hash passwords (you should use bcrypt in real implementation)
	const hash_password = await hashPassword("admin123");
	await db.insert(admin_table).values([
		{
			username: "admin",
			password: hash_password || "brrrrrrr",
		}
	]);

	console.log("✅ Admin User data seeded successfully!");
	console.log("🔐 Default admin credentials:");
	console.log("   Username: admin");
	console.log("   Password: admin123");
}

export async function seedAll() {
	try {
		console.log("🚀 Starting database seeding...");

		await seedAboutUs();
		await seedActivitiesDirectives();
		await seedTrainingPrograms();
		await seedAdminUsers();

		console.log("🎉 All seed data inserted successfully!");
		console.log("🎯 Your health web backend is now ready with sample data!");
	} catch (error) {
		console.error("❌ Error seeding database:", error);
		throw error;
	}
}

// Run seeding if this file is executed directly
if (require.main === module) {
	seedAll()
		.then(() => process.exit(0))
		.catch((error) => {
			console.error(error);
			process.exit(1);
		});
}