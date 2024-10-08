'use server';

import { z } from 'zod';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { FormSchema } from '../types';
import { cookies } from 'next/headers';

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return { error: { message: error.message } };
    }
    return { data };

  } catch (err) {
    return { error: { message: 'An unexpected error occurred during login.' } };
  }
}

export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies });

  try {
    const { data: existingUser, error: existingUserError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email);

    if (existingUser?.length) {
      return { error: { message: 'User already exists', data: existingUser } };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
      },
    });

    if (error) {
      return { error: { message: error.message } };
    }

    return { data };

  } catch (err) {
    return { error: { message: 'An unexpected error occurred during sign-up.' } };
  }
}
