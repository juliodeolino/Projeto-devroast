import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { DiffLine, DiffViewer } from "@/components/ui/diff";
import { ScoreRing } from "@/components/ui/score-ring";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DesignSystemPage() {
  return (
    <div className="container mx-auto py-10 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
        <p className="text-lg text-muted-foreground">
          A showcase of the UI components and their variants.
        </p>
      </div>

      {/* 1. Typography */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          Typography
        </h2>
        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold font-mono">
              paste your code. get roasted.
            </h1>
            <p className="text-sm font-mono text-muted-foreground">
              Heading 1 (Mono)
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-secondary text-sm text-secondary-foreground">
              description text sample
            </p>
            <p className="text-sm font-mono text-muted-foreground">
              Body (Secondary Font)
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-mono text-xs text-muted-foreground">
              lang: javascript · 7 lines
            </p>
            <p className="text-sm font-mono text-muted-foreground">
              Caption (Mono)
            </p>
          </div>
        </div>
      </section>

      {/* 2. Buttons */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          Buttons
        </h2>
        <div className="space-y-8">
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
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sizes</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Toggle */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          Switch (Toggle)
        </h2>
        <div className="flex items-center space-x-16">
          <div className="flex items-center space-x-3">
            <Switch defaultChecked />
            <span className="text-xs font-mono text-accent-green">
              roast mode
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Switch />
            <span className="text-xs font-mono text-muted-foreground">
              roast mode
            </span>
          </div>
        </div>
      </section>

      {/* 4. Badges */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          Badges
        </h2>
        <div className="flex flex-wrap gap-4">
          <Badge variant="critical">Critical</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="good">Good</Badge>
          <Badge variant="neutral">Neutral</Badge>
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      {/* 5. Cards */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          Cards
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>using var instead of const/let</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="font-secondary">
                the var keyword is function-scoped rather than block-scoped,
                which can lead to unexpected behavior and bugs. modern
                javascript uses const for immutable bindings and let for mutable
                ones.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6. Code Block */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          Code Block
        </h2>
        <div className="w-full max-w-2xl">
          <CodeBlock
            code={`function hello() {
  console.log("Hello, world!");
}`}
            lang="typescript"
            fileName="example.ts"
          />
        </div>
      </section>

      {/* 7. Diff Viewer */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          Diff Viewer
        </h2>
        <div className="w-full max-w-2xl">
          <DiffViewer>
            <DiffLine
              type="removed"
              lineNumber={10}
              content="- const user = await db.user.findFirst({ where: { id } });"
            />
            <DiffLine
              type="added"
              lineNumber={10}
              content="+ const user = await db.user.findUnique({ where: { id } });"
            />
            <DiffLine
              type="context"
              lineNumber={11}
              content="  if (!user) throw new Error('User not found');"
            />
          </DiffViewer>
        </div>
      </section>

      {/* 8. Table Row */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          Table Row (Leaderboard)
        </h2>
        <div className="w-full max-w-2xl border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-mono font-bold text-accent-green">
                  #1
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">johndoe</span>
                    <Badge variant="outline" className="text-[10px] h-5 px-1.5">
                      JS
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right font-mono">98</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </section>

      {/* 9. Navbar (REMOVED as requested) */}

      {/* 10. Score Ring */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">
          Score Ring
        </h2>
        <div className="flex gap-8">
          <ScoreRing score={92} total={100} size={180} />
        </div>
      </section>
    </div>
  );
}
