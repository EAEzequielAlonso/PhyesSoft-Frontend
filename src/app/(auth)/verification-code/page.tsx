import {VerificarCodigoForm} from '@/components';

export default async function VerificarCodigoPage({ searchParams }: { searchParams: Promise<{ email?: string }> }) {
  const email = (await searchParams).email;

  return <VerificarCodigoForm email={email} />;
}
