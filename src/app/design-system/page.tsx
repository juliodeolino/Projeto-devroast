import { Button } from "@/components/ui/button";

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto py-10 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
        <p className="text-lg text-muted-foreground">
          A showcase of the UI components and their variants.
        </p>
      </div>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          Buttons
        </h2>

        <div className="space-y-8">
          {/* Variants */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Variants</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button>Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sizes</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <div className="flex items-center gap-2">
                <Button size="icon" aria-label="Icon Button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-plus"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                </Button>
                <span className="text-sm text-muted-foreground">(Icon)</span>
              </div>
            </div>
          </div>

          {/* Disabled State */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">States</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button disabled>Disabled</Button>
              <Button disabled variant="secondary">
                Disabled Secondary
              </Button>
              <Button disabled variant="outline">
                Disabled Outline
              </Button>
              <Button disabled variant="ghost">
                Disabled Ghost
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
