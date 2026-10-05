import AdminLayoutWrapper from './AdminLayoutWrapper';

export const metadata = {
  title: 'Admin Dashboard | Corazon Air',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminLayoutWrapper>
      {children}
    </AdminLayoutWrapper>
  );
}
