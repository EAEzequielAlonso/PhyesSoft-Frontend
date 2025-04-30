import { Html, Head, Preview, Body, Container, Text, Heading, Section } from '@react-email/components';

type Props = {
  code: string;
  email: string;
};

export function VerificationEmail({ code, email }: Props) {
  return (
    <Html>
      <Head />
      <Preview>Tu código de verificación de PHYES SOFT</Preview>
      <Body style={{ backgroundColor: '#f4f4f4', fontFamily: 'Segoe UI, sans-serif' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', borderRadius: '8px', padding: '30px' }}>
          <Section style={{ textAlign: 'center', backgroundColor: '#004080', padding: '20px', borderRadius: '8px 8px 0 0' }}>
            <Heading style={{ color: '#fff', fontSize: '24px' }}>PHYES SOFT</Heading>
          </Section>
          <Section style={{ padding: '30px 0', textAlign: 'center' }}>
            <Text style={{ fontSize: '16px', marginBottom: '20px' }}>
              Hola <strong>{email}</strong>, gracias por registrarte.
              <br />
              Tu código de verificación es:
            </Text>
            <Text style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', backgroundColor: '#ff6600', padding: '12px 24px', display: 'inline-block', borderRadius: '6px' }}>
              {code}
            </Text>
            <Text style={{ marginTop: '20px', color: '#666' }}>Este código expirará en 10 minutos.</Text>
          </Section>
          <Section style={{ textAlign: 'center', fontSize: '12px', color: '#aaa' }}>
            © 2025 PHYES SOFT · <a href="https://www.phyessoft.com" style={{ color: '#004080', textDecoration: 'none' }}>www.phyes.com</a>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
