import {createMiddlewareClient} from '@supabase/auth-helpers-nextjs'
import {NextResponse} from 'next/server'

export async function middleware(req: any){
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({req, res});
    await supabase.auth.getSession();
    return res;
}
