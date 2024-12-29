import Footer from "@/components/Footer";
import HomeNavbar from "@/components/navbar/HomeNavbar";
import getCurrentUser from "@/lib/actions/getCurrentUser";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <section>
      <HomeNavbar currentUser={currentUser} />
      <main>
        <div>{children}</div>
      </main>
      <Footer />
    </section>
  );
}
