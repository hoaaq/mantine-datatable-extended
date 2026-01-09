import { generateStaticParamsFor, importPage } from "nextra/pages";
import { Suspense } from "react";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mdxPath: string[] }>;
}) {
  const { mdxPath } = await params;
  const { metadata } = await importPage(mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: {
  params: Promise<{ mdxPath: string[] }>;
}) {
  const { params } = await props;
  const { mdxPath } = await params;
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(mdxPath);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper metadata={metadata} sourceCode={sourceCode} toc={toc}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    </Suspense>
  );
}
