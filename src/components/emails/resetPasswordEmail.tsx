import { Html, Head, Preview, Body, Container, Text, Heading, Section, Link } from '@react-email/components';

type Props = {
  resetLink: string;
  email: string;
};

export function ResetPasswordEmail({ resetLink, email }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Recuperación de contraseña - PHYES SOFT</Preview>
      <Body style={{ backgroundColor: '#f4f4f4', fontFamily: 'Segoe UI, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '30px' }}>
          <Section style={{ textAlign: 'center', backgroundColor: '#004080', padding: '20px', borderRadius: '8px 8px 0 0' }}>
            <Heading style={{ color: '#fff', fontSize: '24px' }}>PHYES SOFT</Heading>
          </Section>
          <Section style={{ padding: '30px 0', textAlign: 'center' }}>
            <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
              Hola <strong>{email}</strong>,
              <br />
              Hemos recibido una solicitud para restablecer tu contraseña.
            </Text>
            <Link
              href={resetLink}
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#ffffff',
                backgroundColor: '#4CAF50',
                padding: '14px 28px',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Restablecer contraseña
            </Link>
            <Text style={{ marginTop: '20px', color: '#666' }}>
              Este enlace expirará en 15 minutos. Si no solicitaste este cambio, puedes ignorar este correo.
            </Text>
          </Section>
          <Section style={{ textAlign: 'center', fontSize: '12px', color: '#aaa' }}>
            © 2025 PHYES SOFT · <a href="https://www.phyessoft.com" style={{ color: '#004080', textDecoration: 'none' }}>www.phyes.com</a>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
