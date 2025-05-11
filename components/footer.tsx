export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 bg-card border-t border-border/20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Dicky Hazmi Bahrain</h2>
            <p className="text-muted-foreground mt-1">Video Editor & Content Creator</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-muted-foreground">© {currentYear} All Rights Reserved</p>
            <p className="text-muted-foreground/50 text-sm mt-1">Designed with ♥ by Dicky Hazmi Bahrain</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
