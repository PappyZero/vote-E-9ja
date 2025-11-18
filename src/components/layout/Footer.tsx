import Logo from "@/components/icons/Logo";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
             <Logo className="h-6 w-auto" />
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} vote-e-9ja. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
