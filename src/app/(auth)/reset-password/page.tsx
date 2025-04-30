import { ResetPasswordForm } from '@/components';

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
  const token = (await searchParams).token ?? '';

  return <ResetPasswordForm token={token} />;
}
