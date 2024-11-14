
CREATE TABLE IF NOT EXISTS  admins(
    id SERIAL PRIMARY KEY,
    name  text  NOT NULL,
    password  text  NOT NULL,
    email  text unique  NOT NULL,
    time TIMESTAMP DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS admins_tokens (
    id SERIAL PRIMARY KEY,
    token text NOT NULL,
    ip text NOT NULL ,
    user_agent text NOT Null ,
    time TIMESTAMP DEFAULT NOW() ,
    admin_id INTEGER NOT NULL  REFERENCES admins(id)
);

CREATE TABLE IF NOT EXISTS public.translation
(
    id serial NOT NULL,
    text text COLLATE pg_catalog."default" NOT NULL,
    lang_id serial NOT NULL,
    contaxt_id serial NOT NULL,
    CONSTRAINT task_status_pkey PRIMARY KEY (id),
    CONSTRAINT status_unique UNIQUE (text)
);

CREATE TABLE IF NOT EXISTS public.plans
(
    id serial NOT NULL,
    name text NOT NULL,
    CONSTRAINT user_level_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.langs
(
    id serial NOT NULL,
    name text NOT NULL,
    CONSTRAINT user_payment_pkey PRIMARY KEY (id),
    CONSTRAINT name_unique UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS public.user_roll
(
    id serial NOT NULL,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_roll_pkey PRIMARY KEY (id),
    CONSTRAINT type_unique UNIQUE (type)
);

CREATE TABLE IF NOT EXISTS public.restaurants
(
    id serial NOT NULL,
    colors text COLLATE pg_catalog."default" NOT NULL,
    can_order boolean,
    user_id integer NOT NULL,
    expire_date timestamp without time zone[] NOT NULL,
    plan_id integer,
    CONSTRAINT user_task_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public."textContext"
(
    id serial NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default" NOT NULL,
    roll_id integer NOT NULL,
    CONSTRAINT id_pr PRIMARY KEY (id),
    CONSTRAINT email_unique UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS public.branches
(
    id serial NOT NULL,
    restaurants_id integer NOT NULL,
    textcontext_id integer NOT NULL,
    is_main boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.supported_langs
(
    id serial NOT NULL,
    lang_id integer NOT NULL,
    restaurants_id integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.category
(
    id serial NOT NULL,
    textcontext_id integer NOT NULL,
    restaurants_id integer NOT NULL,
    user_id integer NOT NULL,
    img text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.products
(
    id serial NOT NULL,
    quantity integer NOT NULL,
    imgs text NOT NULL,
    price numeric(20, 3) NOT NULL,
    display_price numeric(20, 3) NOT NULL,
    discount numeric(5, 2) NOT NULL,
    category_id integer NOT NULL,
    restaurants_id integer NOT NULL,
    textcontext_id integer NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.avaible_in
(
    id serial NOT NULL,
    branches_id integer NOT NULL,
    restureant_id integer NOT NULL,
    product_id integer NOT NULL,
    CONSTRAINT pk_id PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.products_addons_title
(
    id serial NOT NULL,
    product_id integer NOT NULL,
    textcontext_id integer NOT NULL,
    is_many boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.products_addons
(
    id serial NOT NULL,
    addons_title_id integer NOT NULL,
    text_context_id integer NOT NULL,
    price numeric(20, 3) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.translation
    ADD CONSTRAINT lang_id_forign FOREIGN KEY (lang_id)
    REFERENCES public.langs (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.translation
    ADD CONSTRAINT context_id_forign FOREIGN KEY (contaxt_id)
    REFERENCES public."textContext" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.restaurants
    ADD CONSTRAINT plan_id_forign FOREIGN KEY (plan_id)
    REFERENCES public.plans (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.restaurants
    ADD CONSTRAINT user_id_forign FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.users
    ADD CONSTRAINT user_type_fk FOREIGN KEY (roll_id)
    REFERENCES public.user_roll (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.branches
    ADD CONSTRAINT resturant_id FOREIGN KEY (restaurants_id)
    REFERENCES public.restaurants (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.branches
    ADD CONSTRAINT textcontext_id FOREIGN KEY (textcontext_id)
    REFERENCES public."textContext" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.supported_langs
    ADD CONSTRAINT langs_id_forign FOREIGN KEY (lang_id)
    REFERENCES public.langs (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.supported_langs
    ADD CONSTRAINT resturant_id_forign FOREIGN KEY (restaurants_id)
    REFERENCES public.restaurants (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.category
    ADD CONSTRAINT textcontext_id_forign FOREIGN KEY (textcontext_id)
    REFERENCES public."textContext" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.category
    ADD CONSTRAINT user_id_forign FOREIGN KEY (user_id)
    REFERENCES public.users (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.category
    ADD CONSTRAINT restureant_id_forign FOREIGN KEY (restaurants_id)
    REFERENCES public.restaurants (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.products
    ADD CONSTRAINT textcontext_id_forign FOREIGN KEY (textcontext_id)
    REFERENCES public."textContext" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.products
    ADD CONSTRAINT resturants_id_forign FOREIGN KEY (restaurants_id)
    REFERENCES public.restaurants (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.products
    ADD CONSTRAINT category_id_forign FOREIGN KEY (category_id)
    REFERENCES public.category (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.avaible_in
    ADD CONSTRAINT branches_id_forign FOREIGN KEY (branches_id)
    REFERENCES public.branches (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.avaible_in
    ADD CONSTRAINT restureant_id_forign FOREIGN KEY (restureant_id)
    REFERENCES public.restaurants (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.avaible_in
    ADD CONSTRAINT product_id_foreign FOREIGN KEY (product_id)
    REFERENCES public.products (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.products_addons_title
    ADD CONSTRAINT textcontext_id_forign FOREIGN KEY (textcontext_id)
    REFERENCES public."textContext" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.products_addons_title
    ADD CONSTRAINT product_id_forign FOREIGN KEY (product_id)
    REFERENCES public.products (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.products_addons
    ADD CONSTRAINT addons_title_id_foreign FOREIGN KEY (addons_title_id)
    REFERENCES public.products_addons_title (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;


ALTER TABLE IF EXISTS public.products_addons
    ADD CONSTRAINT textcontext_id_foreign FOREIGN KEY (text_context_id)
    REFERENCES public."textContext" (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION
    NOT VALID;

