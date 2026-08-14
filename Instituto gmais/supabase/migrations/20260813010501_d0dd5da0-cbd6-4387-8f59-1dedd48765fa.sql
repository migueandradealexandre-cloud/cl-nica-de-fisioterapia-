CREATE TABLE public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    preferred_date DATE,
    message TEXT,
    status TEXT DEFAULT 'pending' NOT NULL
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
GRANT INSERT ON public.bookings TO anon;

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon inserts" ON public.bookings FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow users to see their own bookings" ON public.bookings FOR SELECT TO authenticated USING (auth.jwt() ->> 'email' = email);
