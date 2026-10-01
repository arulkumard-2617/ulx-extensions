import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import PageLayout from '../components/layout/PageLayout.jsx';
import PageHeader from '../components/layout/PageHeader.jsx';

/**
 * Example content page. Duplicate / rename for new screens,
 * then register in manifest.mjs.
 *
 * Do not add preview chrome here (e.g. "All pages") —
 * that lives in src/components/AppPreviewShell.jsx for local preview only.
 */
export default function SamplePage() {
  return (
    <PageLayout maxWidth="max-w-3xl">
      <PageHeader
        title="Sample page"
        description="A minimal content-only page demonstrating the blueprint."
        actions={<Button label="Save" className="m-size" />}
      />

      <section className="rounded-lg border border-border bg-surface p-6">
        <div className="flex max-w-md flex-col gap-1.5">
          <label htmlFor="sample-name" className="text-small font-medium text-text">
            Name
          </label>
          <InputText
            id="sample-name"
            className="m-size w-full"
            placeholder="Enter a name"
          />
          <span className="text-tiny text-text-muted">
            Replace this sample with your application content.
          </span>
        </div>
      </section>
    </PageLayout>
  );
}
