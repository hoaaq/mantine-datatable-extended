import { generateStaticParamsFor, importPage } from "nextra/pages";
import { Suspense } from "react";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

export async function generateMetadata(props: {
  params: { mdxPath: string[] };
}) {
  const { params } = props;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper;

export default async function Page(props: { params: { mdxPath: string[] } }) {
  const params = (await props.params) as { mdxPath: string[] };
  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(params.mdxPath);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Wrapper metadata={metadata} sourceCode={sourceCode} toc={toc}>
        <MDXContent {...props} params={params} />
      </Wrapper>
    </Suspense>
  );
}
