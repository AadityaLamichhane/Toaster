--
-- PostgreSQL database dump
--

\restrict mL7J4Swtf08PNbVXNfCLwF9HLr8qwZKeujKc0yoGdpaRQA4gMUaBnBIl5rBCF9D

-- Dumped from database version 15.14
-- Dumped by pg_dump version 15.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: act; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.act (
    id integer NOT NULL,
    description_ne text NOT NULL,
    description_en text NOT NULL,
    "created_At" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.act OWNER TO health;

--
-- Name: act_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.act_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.act_id_seq OWNER TO health;

--
-- Name: act_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.act_id_seq OWNED BY public.act.id;


--
-- Name: admin; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.admin (
    id integer NOT NULL,
    username text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.admin OWNER TO health;

--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.admin_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.admin_id_seq OWNER TO health;

--
-- Name: admin_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.admin_id_seq OWNED BY public.admin.id;


--
-- Name: banners; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.banners (
    id integer NOT NULL,
    title_en text NOT NULL,
    title_ne text NOT NULL,
    link text,
    banner_image text NOT NULL
);


ALTER TABLE public.banners OWNER TO health;

--
-- Name: banners_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.banners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.banners_id_seq OWNER TO health;

--
-- Name: banners_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.banners_id_seq OWNED BY public.banners.id;


--
-- Name: budget_progress; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.budget_progress (
    id integer NOT NULL,
    name_en text NOT NULL,
    name_ne text,
    date text NOT NULL,
    thumbnail_img text NOT NULL,
    "created_At" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.budget_progress OWNER TO health;

--
-- Name: budget_progress_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.budget_progress_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.budget_progress_id_seq OWNER TO health;

--
-- Name: budget_progress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.budget_progress_id_seq OWNED BY public.budget_progress.id;


--
-- Name: contact_us; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.contact_us (
    id integer NOT NULL,
    name_en text NOT NULL,
    name_ne text NOT NULL,
    contact_number text NOT NULL,
    email text,
    subject text,
    messege text
);


ALTER TABLE public.contact_us OWNER TO health;

--
-- Name: contact_us_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.contact_us_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contact_us_id_seq OWNER TO health;

--
-- Name: contact_us_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.contact_us_id_seq OWNED BY public.contact_us.id;


--
-- Name: directive; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.directive (
    id integer NOT NULL,
    description_en text NOT NULL,
    description_ne text NOT NULL,
    "created_At" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.directive OWNER TO health;

--
-- Name: directive_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.directive_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.directive_id_seq OWNER TO health;

--
-- Name: directive_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.directive_id_seq OWNED BY public.directive.id;


--
-- Name: director_message; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.director_message (
    id integer NOT NULL,
    message_en text NOT NULL,
    message_ne text NOT NULL,
    director_staff_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.director_message OWNER TO health;

--
-- Name: director_message_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.director_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.director_message_id_seq OWNER TO health;

--
-- Name: director_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.director_message_id_seq OWNED BY public.director_message.id;


--
-- Name: form_formats; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.form_formats (
    id integer NOT NULL,
    name_en text NOT NULL,
    name_ne text,
    content_en text NOT NULL,
    content_ne text NOT NULL,
    date text NOT NULL,
    thumbnail_img text NOT NULL,
    download_file text,
    "created_At" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.form_formats OWNER TO health;

--
-- Name: form_formats_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.form_formats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.form_formats_id_seq OWNER TO health;

--
-- Name: form_formats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.form_formats_id_seq OWNED BY public.form_formats.id;


--
-- Name: general_information; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.general_information (
    id integer NOT NULL,
    name_en text NOT NULL,
    name_ne text NOT NULL,
    date text NOT NULL,
    thumbnail_img text NOT NULL,
    content_en text NOT NULL,
    content_ne text NOT NULL,
    "created_At" timestamp without time zone DEFAULT now(),
    download_file text,
    status boolean DEFAULT true
);


ALTER TABLE public.general_information OWNER TO health;

--
-- Name: general_information_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.general_information_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.general_information_id_seq OWNER TO health;

--
-- Name: general_information_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.general_information_id_seq OWNED BY public.general_information.id;


--
-- Name: highlights; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.highlights (
    id integer NOT NULL,
    name_ne text NOT NULL,
    name_en text NOT NULL,
    downloads text NOT NULL,
    thumbnail_image text NOT NULL,
    content_en text NOT NULL,
    content_ne text NOT NULL,
    date text NOT NULL,
    "currentTime" timestamp without time zone DEFAULT now(),
    "time" text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.highlights OWNER TO health;

--
-- Name: highlights_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.highlights_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.highlights_id_seq OWNER TO health;

--
-- Name: highlights_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.highlights_id_seq OWNED BY public.highlights.id;


--
-- Name: introduction; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.introduction (
    id integer NOT NULL,
    content_en text NOT NULL,
    content_ne text NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.introduction OWNER TO health;

--
-- Name: introduction_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.introduction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.introduction_id_seq OWNER TO health;

--
-- Name: introduction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.introduction_id_seq OWNED BY public.introduction.id;


--
-- Name: media_image; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.media_image (
    id integer NOT NULL,
    title text NOT NULL,
    title_ne text NOT NULL,
    images_url text[]
);


ALTER TABLE public.media_image OWNER TO health;

--
-- Name: media_image_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.media_image_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_image_id_seq OWNER TO health;

--
-- Name: media_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.media_image_id_seq OWNED BY public.media_image.id;


--
-- Name: official_staff; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.official_staff (
    id integer NOT NULL,
    name_en text NOT NULL,
    name_ne text NOT NULL,
    position_en text NOT NULL,
    position_ne text NOT NULL,
    email text,
    phone text,
    photo_url text,
    created_at timestamp without time zone DEFAULT now(),
    "socialLinks" text[],
    twitter_link text,
    instagram_link text,
    feature boolean DEFAULT true
);


ALTER TABLE public.official_staff OWNER TO health;

--
-- Name: official_staff_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.official_staff_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.official_staff_id_seq OWNER TO health;

--
-- Name: official_staff_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.official_staff_id_seq OWNED BY public.official_staff.id;


--
-- Name: our_service; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.our_service (
    id integer NOT NULL,
    name_ne text NOT NULL,
    name_en text NOT NULL,
    link text NOT NULL,
    icon text NOT NULL,
    status boolean DEFAULT true
);


ALTER TABLE public.our_service OWNER TO health;

--
-- Name: our_service_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.our_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.our_service_id_seq OWNER TO health;

--
-- Name: our_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.our_service_id_seq OWNED BY public.our_service.id;


--
-- Name: procedure; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.procedure (
    id integer NOT NULL,
    description_en text NOT NULL,
    description_ne text NOT NULL,
    "created_At" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.procedure OWNER TO health;

--
-- Name: procedure_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.procedure_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.procedure_id_seq OWNER TO health;

--
-- Name: procedure_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.procedure_id_seq OWNED BY public.procedure.id;


--
-- Name: regulation; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.regulation (
    id integer NOT NULL,
    description_ne text NOT NULL,
    description_en text NOT NULL,
    "created_At" timestamp without time zone DEFAULT now()
);


ALTER TABLE public.regulation OWNER TO health;

--
-- Name: regulation_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.regulation_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.regulation_id_seq OWNER TO health;

--
-- Name: regulation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.regulation_id_seq OWNED BY public.regulation.id;


--
-- Name: scheduled_program_table; Type: TABLE; Schema: public; Owner: health
--

CREATE TABLE public.scheduled_program_table (
    id integer NOT NULL,
    title text NOT NULL,
    event_date timestamp without time zone,
    event_venue text NOT NULL,
    description text NOT NULL,
    added_images text[],
    thumbnail_image text
);


ALTER TABLE public.scheduled_program_table OWNER TO health;

--
-- Name: scheduled_program_table_id_seq; Type: SEQUENCE; Schema: public; Owner: health
--

CREATE SEQUENCE public.scheduled_program_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.scheduled_program_table_id_seq OWNER TO health;

--
-- Name: scheduled_program_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: health
--

ALTER SEQUENCE public.scheduled_program_table_id_seq OWNED BY public.scheduled_program_table.id;


--
-- Name: act id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.act ALTER COLUMN id SET DEFAULT nextval('public.act_id_seq'::regclass);


--
-- Name: admin id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.admin ALTER COLUMN id SET DEFAULT nextval('public.admin_id_seq'::regclass);


--
-- Name: banners id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.banners ALTER COLUMN id SET DEFAULT nextval('public.banners_id_seq'::regclass);


--
-- Name: budget_progress id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.budget_progress ALTER COLUMN id SET DEFAULT nextval('public.budget_progress_id_seq'::regclass);


--
-- Name: contact_us id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.contact_us ALTER COLUMN id SET DEFAULT nextval('public.contact_us_id_seq'::regclass);


--
-- Name: directive id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.directive ALTER COLUMN id SET DEFAULT nextval('public.directive_id_seq'::regclass);


--
-- Name: director_message id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.director_message ALTER COLUMN id SET DEFAULT nextval('public.director_message_id_seq'::regclass);


--
-- Name: form_formats id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.form_formats ALTER COLUMN id SET DEFAULT nextval('public.form_formats_id_seq'::regclass);


--
-- Name: general_information id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.general_information ALTER COLUMN id SET DEFAULT nextval('public.general_information_id_seq'::regclass);


--
-- Name: highlights id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.highlights ALTER COLUMN id SET DEFAULT nextval('public.highlights_id_seq'::regclass);


--
-- Name: introduction id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.introduction ALTER COLUMN id SET DEFAULT nextval('public.introduction_id_seq'::regclass);


--
-- Name: media_image id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.media_image ALTER COLUMN id SET DEFAULT nextval('public.media_image_id_seq'::regclass);


--
-- Name: official_staff id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.official_staff ALTER COLUMN id SET DEFAULT nextval('public.official_staff_id_seq'::regclass);


--
-- Name: our_service id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.our_service ALTER COLUMN id SET DEFAULT nextval('public.our_service_id_seq'::regclass);


--
-- Name: procedure id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.procedure ALTER COLUMN id SET DEFAULT nextval('public.procedure_id_seq'::regclass);


--
-- Name: regulation id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.regulation ALTER COLUMN id SET DEFAULT nextval('public.regulation_id_seq'::regclass);


--
-- Name: scheduled_program_table id; Type: DEFAULT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.scheduled_program_table ALTER COLUMN id SET DEFAULT nextval('public.scheduled_program_table_id_seq'::regclass);


--
-- Data for Name: act; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.act (id, description_ne, description_en, "created_At") FROM stdin;
1	सार्वजनिक स्वास्थ्य सेवा ऐन २०७५ - सार्वजनिक स्वास्थ्य सेवा र तालिम आवश्यकताहरूका लागि मापदण्डहरू स्थापना।	Public Health Service Act 2075 - Establishing standards for public health services and training requirements.	2025-10-29 14:13:28.18216
2	चिकित्सा शिक्षा र तालिम ऐन २०७६ - चिकित्सा र स्वास्थ्य सेवा तालिम संस्थानहरूका लागि दिशानिर्देश।	Medical Education and Training Act 2076 - Guidelines for medical and healthcare training institutions.	2025-10-29 14:13:28.18216
\.


--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.admin (id, username, password) FROM stdin;
1	admin	$2b$10$0Sg0yj/daEyTfO8BCSFqleC97M4A2fUUQZUVHS6VTkgrN1MKxV2Fy
\.


--
-- Data for Name: banners; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.banners (id, title_en, title_ne, link, banner_image) FROM stdin;
7	This is the english title 	This is the nepali title	This is the links	uploads/our_service/banner/images/327_our_service_.webp
8	Training Hall of Province Health Training Center, Koshi Province	प्रदेश स्वास्थ्य तालिम केन्द्रको प्रशिक्षण कक्ष	https://example.com	uploads/our_service/banner/images/233_our_service_.webp
9	This is the english title 	This is the nepali title	This is the links	uploads/our_service/banner/images/906_our_service_.webp
\.


--
-- Data for Name: budget_progress; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.budget_progress (id, name_en, name_ne, date, thumbnail_img, "created_At") FROM stdin;
3	baseValidationcontenten	baseValidationcontenten	2025-05-12T13:00:00.000Z	uploads/general_info/images/447_baseValidationcontenten.webp	2025-10-31 10:57:05.891737
\.


--
-- Data for Name: contact_us; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.contact_us (id, name_en, name_ne, contact_number, email, subject, messege) FROM stdin;
1	hello name	name in nepali 	9876543399	helloamasase@gmail.com	This is the random testing subkkect 	 baseValidation.message_any.optional() tasajshkasjahskjahskajhsjadhjshfjdhfjdfhjdfh jdfhjd fhjdfh 
\.


--
-- Data for Name: directive; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.directive (id, description_en, description_ne, "created_At") FROM stdin;
1	COVID-19 Training Safety Directive - Special guidelines for conducting training during pandemic.	कोभिड-१९ तालिम सुरक्षा निर्देशिका - महामारीको समयमा तालिम सञ्चालनका लागि विशेष दिशानिर्देश।	2025-10-29 14:13:28.188102
\.


--
-- Data for Name: director_message; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.director_message (id, message_en, message_ne, director_staff_id, created_at) FROM stdin;
4	<p>Dear Visitors,</p><p>Welcome to Health Training center, Koshi Province</p><p></p><p>As the Health Training Director, I am honored to lead our efforts in promoting health education, fostering professional development, and ensuring high-quality training programs that empower individuals and communities alike.</p><p></p><p>Our mission is to equip healthcare professionals with the skills, knowledge, and resources they need to provide excellent care and address the evolving challenges of the healthcare system. Through a combination of innovative learning approaches, hands-on practice, and a commitment to excellence, we strive to create impactful change in health outcomes.</p><p></p><p>We encourage you to explore our website to learn more about our training programs, initiatives, and achievements. Together, we can build a healthier, more informed future.</p><p></p><p>Thank you for your continued trust and support in our journey toward better health for all.</p>	<p>प्रिय दर्शक महानुभावहरू,</p><p>स्वास्थ्य तालिम केन्द्र, कोशी प्रदेशमा स्वागत छ।</p><p></p><p>स्वास्थ्य तालिम निर्देशकको रूपमा, स्वास्थ्य शिक्षा प्रवर्द्धन, व्यावसायिक विकास सुदृढीकरण, तथा व्यक्तिहरू र समुदायहरूलाई सशक्त बनाउने उच्च-गुणस्तरीय तालिम कार्यक्रमहरू संचालन गर्न पाउनु मेरो लागि गर्वको विषय हो।</p><p></p><p>हाम्रो लक्ष्य स्वास्थ्यकर्मीहरूलाई आवश्यक सीप, ज्ञान, र स्रोतहरू प्रदान गर्नु हो, जसले उनीहरूलाई उत्कृष्ट सेवा दिन र स्वास्थ्य प्रणालीमा व्याप्त बदलिँदो चुनौतीहरूलाई प्रभावकारी रूपमा सम्बोधन गर्न सक्षम बनाउँछ। नवीनतम शिक्षण विधि, व्यवहारिक अभ्यास, र उत्कृष्टताप्रतिको हाम्रो अटूट प्रतिबद्धतामार्फत हामी स्वास्थ्य नतिजामा दीर्घकालीन प्रभाव पार्ने लक्ष्य राख्छौं।</p><p></p><p>हामीले प्रदान गर्ने तालिम कार्यक्रम, पहलहरू, तथा उपलब्धिहरूबारे थप जान्नका लागि हाम्रो वेबसाइट अवलोकन गर्न अनुरोध गर्दछौँ। सबै मिलेर हामी अझ स्वस्थ, सचेत र समृद्ध भविष्य निर्माण गर्न सक्छौँ।</p><p></p><p>सबैका लागि उत्तम स्वास्थ्यको यात्रामा तपाईंले देखाउनु भएको निरन्तर विश्वास र सहयोगप्रति हार्दिक धन्यवाद।</p>	1	2025-11-21 18:26:52.252033
\.


--
-- Data for Name: form_formats; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.form_formats (id, name_en, name_ne, content_en, content_ne, date, thumbnail_img, download_file, "created_At") FROM stdin;
\.


--
-- Data for Name: general_information; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.general_information (id, name_en, name_ne, date, thumbnail_img, content_en, content_ne, "created_At", download_file, status) FROM stdin;
\.


--
-- Data for Name: highlights; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.highlights (id, name_ne, name_en, downloads, thumbnail_image, content_en, content_ne, date, "currentTime", "time", status) FROM stdin;
9	baseValidationnameen	This is current highlight update current highlight update current highlight update	joi.string().required()	uploads/our_service/highlights/images/869_highlights_service_.webp	<p style="text-align: left;">Province Government Ministry of Health, trainning center koshi province</p>	joi.string().required()	2025-02-02	2025-11-24 16:16:04.793761	Mon Nov 24 2025 16:16:04 GMT+0545 (Nepal Time)	t
12	baseValidationnameen	Healthcare-web	joi.string().required()	uploads/our_service/highlights/images/755_highlights_service_.webp	<p style="text-align: left;">Healthcare web nepal provide training and skill development in heath and social work and welfare within the society</p>	joi.string().required()	2025-02-11	2025-11-24 16:32:30.399075	Mon Nov 24 2025 16:32:30 GMT+0545 (Nepal Time)	t
\.


--
-- Data for Name: introduction; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.introduction (id, content_en, content_ne, created_at, updated_at) FROM stdin;
8	<p style="text-align: left;">Introduction</p><p style="text-align: left;">Health Training Centre, Koshi Province was established in 2075 BS to coordinate and manage all training under Ministry of Health, Koshi Province. It caters to the overall provindical health training needs and fulfils the capacity building needs of federal Departments, Divisions and Centers as per the annual red book programs, thus contributing to meet the periodic targets envisioned by the Koshi province and federal government of Nepal. It plans and conducts training activities in line with the National Health Training Strategy 2004 AD.</p><p style="text-align: left;"><strong>Goal</strong></p><p style="text-align: left;">To develop the technical and managerial capacity of health service providers at province and local levels to deliver quality health care services to attain the optimum level of health status</p><p style="text-align: left;"><strong>Objectives</strong></p><ul class="list-disc ml-3"><li><p style="text-align: left;">To standardize the training Learning Resource Packages (LRP) i.e. Trainer"s Guide, Participant"s Handbook and Reference Manual as per the need of provincial health system</p></li><li><p style="text-align: left;">To organize and conduct health trainings to address the need of Koshi province and to support the quality of care by enhancing the service provider"s competency</p></li><li><p style="text-align: left;">To ensure the quality of training activities by different mechanisms in adherence to national and provincial standards and to enhance the capacity of different training sites within Koshi province</p></li><li><p style="text-align: left;">To adopt and promote innovative and effective training approaches</p></li><li><p style="text-align: left;">To strengthen mechanism and capacity for post training follow up and support</p></li></ul><p style="text-align: left;"><strong>Strategies</strong></p><ul class="list-disc ml-3"><li><p style="text-align: left;">Assessing, standardizing and pipelining the accreditating process of training activities and training sites</p></li><li><p style="text-align: left;">Developing and standardizing training packages and forward them for final accreditation and national adoption to the federal government</p></li><li><p style="text-align: left;">Institutional Capacity development of training sites</p></li><li><p style="text-align: left;">Conducting pre-service, orientation, refresher, short term and long term trainings as per provincial requirements</p></li><li><p style="text-align: left;">Integrating and institutionalizing training activities</p></li><li><p style="text-align: left;">Developing links with professional career development organizations</p></li><li><p style="text-align: left;">Strengthening Training Information Management System (TIMS), minimize duplicacy, absenteesm among participants and develop trainer"s pool at provincial level</p></li></ul><p style="text-align: left;"></p><ul class="list-disc ml-3"><li><p style="text-align: left;">Assess training requirements of health workers of province and local level and prepare training plans based on programmatic requirements.</p></li><li><p style="text-align: left;">Plan, implement and train health workers as demanded by programs.</p></li><li><p style="text-align: left;">Review and recommend national training system regarding the design, development and refinement of teaching, learning materials to support implementation of training programs.</p></li><li><p style="text-align: left;">Develop/improve capacity of trainers to deliver quality training at provincial, district and local level.</p></li><li><p style="text-align: left;">Support Provincial Health Directorate and Health Offices in organizing, implementing and evaluating capacity building activities.</p></li><li><p style="text-align: left;">Co-ordinate with all External Development Partners (EDPs) to avoid duplication and improve quality of training eventually appropriately channelizing trainings within Koshi province</p></li><li><p style="text-align: left;">Orient newly recruited health workers on health programs.</p></li><li><p style="text-align: left;">Supervise, monitor, follow-up and evaluate training programs within Koshi province.</p></li><li><p style="text-align: left;">Conduct operational studies to improve training efficiency and effectiveness.</p></li><li><p style="text-align: left;">Organize inter-provincial trainings as per need.</p></li><li><p style="text-align: left;">Maintain TIMS for the quality recording and reporting systems of all training programs within province, district, and local level</p></li></ul><p style="text-align: left;"></p>	<p style="text-align: left;"><strong>परिचय</strong></p><p style="text-align: left;">स्वास्थ्य तालिम केन्द्र, कोशी प्रदेशको स्थापना २०७५ सालमा भएको हो, जसको उद्देश्य कोशी प्रदेश सरकार अन्तर्गत स्वास्थ्य मन्त्रालयका सम्पूर्ण तालिमहरूको समन्वय र व्यवस्थापन गर्नु हो। यस केन्द्रले समग्र प्रादेशिक स्वास्थ्य तालिम आवश्यकताहरू सम्बोधन गर्दछ र संघीय मन्त्रालय, विभाग, महाशाखा तथा केन्द्रहरूको क्षमता अभिवृद्धि आवश्यकताहरूलाई वार्षिक रेड बुक कार्यक्रमअनुसार पूरा गर्दछ, जसले कोशी प्रदेश तथा नेपाल सरकारद्वारा envision गरिएका अवधिक लक्ष्यहरू प्राप्त गर्न योगदान पुर्याउँछ। यसले राष्ट्रिय स्वास्थ्य तालिम रणनीति २००४ अनुसार तालिम योजना बनाउने र सञ्चालन गर्ने कार्य गर्दछ।</p><h3 style="text-align: left;"><strong>उद्देश्य (Goal)</strong></h3><p style="text-align: left;">प्रदेश र स्थानीय तहमा कार्यरत स्वास्थ्य सेवा प्रदायकहरूको प्राविधिक तथा व्यवस्थापकीय क्षमताको विकास गरी गुणस्तरीय स्वास्थ्य सेवा प्रवाह गर्ने र जनस्वास्थ्य स्तरलाई उच्चतम अवस्थामा पुर्याउने।</p><h3 style="text-align: left;"><strong>विशेष उद्देश्यहरू (Objectives)</strong></h3><ul class="list-disc ml-3"><li><p style="text-align: left;">प्रादेशिक स्वास्थ्य प्रणालीको आवश्यकताअनुसार तालिम अध्ययन स्रोत सामग्रीहरू (Trainer"s Guide, Participant"s Handbook, Reference Manual) लाई मापदण्डमा ल्याउने।</p></li><li><p style="text-align: left;">कोशी प्रदेशको आवश्यकतालाई सम्बोधन गर्न स्वास्थ्य तालिमहरू आयोजना गर्ने र सेवा प्रदायकहरूको क्षमता अभिवृद्धि गरी स्वास्थ्य सेवाको गुणस्तर सुधारमा योगदान गर्ने।</p></li><li><p style="text-align: left;">राष्ट्रिय तथा प्रादेशिक मापदण्डअनुसार विभिन्न संयन्त्रहरूमार्फत तालिम गतिविधिहरूको गुणस्तर सुनिश्चित गर्ने र कोशी प्रदेशभित्रका तालिम केन्द्रहरूको क्षमता अभिवृद्धि गर्ने।</p></li><li><p style="text-align: left;">नविन र प्रभावकारी तालिम पद्धतिहरू अवलम्बन तथा प्रवर्द्धन गर्ने।</p></li><li><p style="text-align: left;">तालिमपछिको अनुगमन, सहयोग तथा मूल्यांकन संयन्त्रलाई सुदृढ बनाउने।</p></li></ul><h3 style="text-align: left;"><strong>रणनीतिहरू (Strategies)</strong></h3><ul class="list-disc ml-3"><li><p style="text-align: left;">तालिम गतिविधि तथा तालिम केन्द्रहरूको मूल्यांकन, मापदण्डीकरण तथा मान्यताको प्रक्रिया अगाडि बढाउने।</p></li><li><p style="text-align: left;">तालिम सामग्रीहरू विकास तथा मापदण्डमा ल्याई संघीय सरकारलाई अन्तिम मान्यता र राष्ट्रिय प्रयोगका लागि सिफारिस गर्ने।</p></li><li><p style="text-align: left;">तालिम केन्द्रहरूको संस्थागत क्षमता अभिवृद्धि गर्ने।</p></li><li><p style="text-align: left;">प्रादेशिक आवश्यकताअनुसार पूर्व-सेवा, अभिमुखीकरण, पुनर्ताजगी, छोटो तथा दीर्घकालीन तालिम सञ्चालन गर्ने।</p></li><li><p style="text-align: left;">तालिम गतिविधिहरूलाई समायोजन र संस्थागत बनाउने।</p></li><li><p style="text-align: left;">व्यावसायिक करियर विकास गर्ने संस्थाहरूसँग सहकार्य गर्ने।</p></li><li><p style="text-align: left;">तालिम सूचना व्यवस्थापन प्रणाली (TIMS) सुदृढ गर्दै सहभागिता दोहोरिनु (duplicacy), अनुपस्थिति (absenteeism) जस्ता समस्याहरू न्यूनीकरण गर्ने र प्रदेश स्तरमा प्रशिक्षक समूह (trainer"s pool) विकास गर्ने।</p></li></ul><h3 style="text-align: left;"><strong>मुख्य कार्यहरू (Key Functions)</strong></h3><ul class="list-disc ml-3"><li><p style="text-align: left;">प्रदेश तथा स्थानीय तहका स्वास्थ्यकर्मीहरूको तालिम आवश्यकता मूल्यांकन गर्ने र कार्यक्रमगत आवश्यकताअनुसार तालिम योजना बनाउने।</p></li><li><p style="text-align: left;">कार्यक्रमअनुसार स्वास्थ्यकर्मीहरूलाई तालिम योजना बनाई कार्यान्वयन गर्ने।</p></li><li><p style="text-align: left;">तालिम कार्यान्वयनमा सहयोग पुर्याउने उद्देश्यले अध्ययन सामग्रीहरू डिजाइन, विकास तथा परिमार्जनसम्बन्धी सिफारिस गर्दै राष्ट्रिय तालिम प्रणालीको पुनरावलोकन गर्ने।</p></li><li><p style="text-align: left;">प्रशिक्षकहरूको क्षमता अभिवृद्धि गरी उनीहरूलाई प्रदेश, जिल्ला र स्थानीय तहमा गुणस्तरीय तालिम सञ्चालन गर्न सक्षम बनाउने।</p></li><li><p style="text-align: left;">प्रादेशिक स्वास्थ्य निर्देशनालय तथा स्वास्थ्य कार्यालयहरूलाई क्षमता विकाससम्बन्धी गतिविधि सञ्चालन, कार्यान्वयन तथा मूल्यांकनमा सहयोग गर्ने।</p></li><li><p style="text-align: left;">सबै बाह्य विकास साझेदारहरूसँग समन्वय गरी तालिमहरूमा दोहोरोपन (duplication) हटाउने र गुणस्तर सुधार गर्दै तालिमहरूलाई कोशी प्रदेश भित्र उचित रूपमा प्रवाह गर्ने।</p></li><li><p style="text-align: left;">नयाँ नियुक्त स्वास्थ्यकर्मीहरूलाई स्वास्थ्य कार्यक्रमसम्बन्धी अभिमुखीकरण प्रदान गर्ने।</p></li><li><p style="text-align: left;">कोशी प्रदेशभित्र तालिम कार्यक्रमहरूको अनुगमन, सुपरिवेक्षण, पछ्याई तथा मूल्यांकन गर्ने।</p></li><li><p style="text-align: left;">तालिमको प्रभावकारिता र कार्यक्षमता सुधार गर्न सञ्चालनमूलक अध्ययनहरू गर्ने।</p></li><li><p style="text-align: left;">आवश्यकताअनुसार अन्तर-प्रादेशिक तालिमहरू आयोजना गर्ने।</p></li><li><p style="text-align: left;">प्रदेश, जिल्ला तथा स्थानीय तहमा सञ्चालन गरिएका सबै तालिम कार्यक्रमहरूको गुणस्तरीय अभिलेख तथा प्रतिवेदनका लागि तालिम सूचना व्यवस्थापन प्रणाली (TIMS) कायम गर्ने।</p></li></ul><p style="text-align: left;"></p>	2025-11-24 17:45:04.799007	2025-11-24 17:45:04.799007
\.


--
-- Data for Name: media_image; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.media_image (id, title, title_ne, images_url) FROM stdin;
1	This is the nepali Title 	This is nepali content	\N
2	This is the nepali Title 	This is nepali content	{uploads/training_programs/images/0_619_1763654262173_.webp}
3	This is the nepali Title 	This is nepali content	{uploads/training_programs/images/0_326_1763723969485_.webp}
\.


--
-- Data for Name: official_staff; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.official_staff (id, name_en, name_ne, position_en, position_ne, email, phone, photo_url, created_at, "socialLinks", twitter_link, instagram_link, feature) FROM stdin;
1	Dr. Ram Prasad Sharma	डा. राम प्रसाद शर्मा	Director	निर्देशक	director@healthtraining.gov.np	+977-9841234567	uploads/staff_official_staff/director_0.webp	2025-10-29 14:13:28.174846	\N	\N	\N	t
2	Sita Maya Gurung	सीता माया गुरुङ	Deputy Director	उप-निर्देशक	deputy.director@healthtraining.gov.np	+977-9851234568	uploads/staff_official_staff/0.webp	2025-10-29 14:13:28.174846	\N	\N	\N	t
3	Krishna Bahadur Rai	कृष्ण बहादुर राई	Senior Training Officer	वरिष्ठ तालिम अधिकृत	training.officer@healthtraining.gov.np	+977-9861234569	uploads/staff_official_staff/staff_Official_.webp	2025-10-29 14:13:28.174846	\N	\N	\N	t
4	Sita Maya Gurung	Sita maya Gurung	Deputy Director	उप-निर्देशक	sitamaya@gmail.com	\N	uploads/staff_official_staff/images/380_Sita Maya Gurung.webp	2025-10-29 16:00:27.573569	\N	\N	\N	t
5	Sita Maya Gurung	Sita maya Gurung	Deputy Director	तालिम अधिकृत	hloasas@gmail.com	\N	uploads/staff_official_staff/images/368_Sita Maya Gurung.webp	2025-11-21 17:03:33.171443	\N	\N	\N	t
\.


--
-- Data for Name: our_service; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.our_service (id, name_ne, name_en, link, icon, status) FROM stdin;
10	asdad	Healthcare Training Center	https://healthcare.com	uploads/our_service/icons/images/33_our_service_icon_.webp	t
11	healthacare	healthcare web tari	https://healthcare-web.com	uploads/our_service/icons/images/510_our_service_icon_.webp	t
12	dbhabdhabdhabdad	habdhabdhb h	https://example.com	uploads/our_service/icons/images/133_our_service_icon_.webp	t
3	 स्वास्थ्य जनशक्ति क्षमता विकास	Health Workforce Capacity	https://example-koshi.com	uploads/our_service/icons/images/223_our_service_icon_.webp	t
\.


--
-- Data for Name: procedure; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.procedure (id, description_en, description_ne, "created_At") FROM stdin;
1	Training Registration Procedure - Step-by-step process for registering training programs and participants.	तालिम दर्ता प्रक्रिया - तालिम कार्यक्रम र सहभागीहरू दर्ताका लागि चरणबद्ध प्रक्रिया।	2025-10-29 14:13:28.186882
\.


--
-- Data for Name: regulation; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.regulation (id, description_ne, description_en, "created_At") FROM stdin;
1	तालिम कार्यक्रम मापदण्ड नियमावली २०७७ - स्वास्थ्य सेवा तालिम कार्यक्रमहरूका न्यूनतम आवश्यकताहरू।	Training Program Standards Regulation 2077 - Minimum requirements for healthcare training programs.	2025-10-29 14:13:28.185273
\.


--
-- Data for Name: scheduled_program_table; Type: TABLE DATA; Schema: public; Owner: health
--

COPY public.scheduled_program_table (id, title, event_date, event_venue, description, added_images, thumbnail_image) FROM stdin;
\.


--
-- Name: act_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.act_id_seq', 2, true);


--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.admin_id_seq', 1, true);


--
-- Name: banners_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.banners_id_seq', 9, true);


--
-- Name: budget_progress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.budget_progress_id_seq', 3, true);


--
-- Name: contact_us_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.contact_us_id_seq', 1, true);


--
-- Name: directive_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.directive_id_seq', 1, true);


--
-- Name: director_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.director_message_id_seq', 4, true);


--
-- Name: form_formats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.form_formats_id_seq', 1, false);


--
-- Name: general_information_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.general_information_id_seq', 1, true);


--
-- Name: highlights_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.highlights_id_seq', 12, true);


--
-- Name: introduction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.introduction_id_seq', 8, true);


--
-- Name: media_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.media_image_id_seq', 3, true);


--
-- Name: official_staff_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.official_staff_id_seq', 5, true);


--
-- Name: our_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.our_service_id_seq', 12, true);


--
-- Name: procedure_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.procedure_id_seq', 1, true);


--
-- Name: regulation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.regulation_id_seq', 1, true);


--
-- Name: scheduled_program_table_id_seq; Type: SEQUENCE SET; Schema: public; Owner: health
--

SELECT pg_catalog.setval('public.scheduled_program_table_id_seq', 11, true);


--
-- Name: act act_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.act
    ADD CONSTRAINT act_pkey PRIMARY KEY (id);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- Name: admin admin_username_unique; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_username_unique UNIQUE (username);


--
-- Name: banners banners_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.banners
    ADD CONSTRAINT banners_pkey PRIMARY KEY (id);


--
-- Name: budget_progress budget_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.budget_progress
    ADD CONSTRAINT budget_progress_pkey PRIMARY KEY (id);


--
-- Name: contact_us contact_us_email_unique; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.contact_us
    ADD CONSTRAINT contact_us_email_unique UNIQUE (email);


--
-- Name: contact_us contact_us_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.contact_us
    ADD CONSTRAINT contact_us_pkey PRIMARY KEY (id);


--
-- Name: directive directive_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.directive
    ADD CONSTRAINT directive_pkey PRIMARY KEY (id);


--
-- Name: director_message director_message_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.director_message
    ADD CONSTRAINT director_message_pkey PRIMARY KEY (id);


--
-- Name: form_formats form_formats_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.form_formats
    ADD CONSTRAINT form_formats_pkey PRIMARY KEY (id);


--
-- Name: general_information general_information_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.general_information
    ADD CONSTRAINT general_information_pkey PRIMARY KEY (id);


--
-- Name: highlights highlights_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.highlights
    ADD CONSTRAINT highlights_pkey PRIMARY KEY (id);


--
-- Name: introduction introduction_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.introduction
    ADD CONSTRAINT introduction_pkey PRIMARY KEY (id);


--
-- Name: media_image media_image_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.media_image
    ADD CONSTRAINT media_image_pkey PRIMARY KEY (id);


--
-- Name: official_staff official_staff_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.official_staff
    ADD CONSTRAINT official_staff_pkey PRIMARY KEY (id);


--
-- Name: our_service our_service_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.our_service
    ADD CONSTRAINT our_service_pkey PRIMARY KEY (id);


--
-- Name: procedure procedure_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.procedure
    ADD CONSTRAINT procedure_pkey PRIMARY KEY (id);


--
-- Name: regulation regulation_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.regulation
    ADD CONSTRAINT regulation_pkey PRIMARY KEY (id);


--
-- Name: scheduled_program_table scheduled_program_table_pkey; Type: CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.scheduled_program_table
    ADD CONSTRAINT scheduled_program_table_pkey PRIMARY KEY (id);


--
-- Name: director_message director_message_director_staff_id_official_staff_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: health
--

ALTER TABLE ONLY public.director_message
    ADD CONSTRAINT director_message_director_staff_id_official_staff_id_fk FOREIGN KEY (director_staff_id) REFERENCES public.official_staff(id);


--
-- PostgreSQL database dump complete
--

\unrestrict mL7J4Swtf08PNbVXNfCLwF9HLr8qwZKeujKc0yoGdpaRQA4gMUaBnBIl5rBCF9D

