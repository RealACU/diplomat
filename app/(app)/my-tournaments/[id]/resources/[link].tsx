import { useRouter } from 'next/router';

const ResourcePage = () => {
  const router = useRouter();
  const { link } = router.query;

  // If link is an array, take the first element
  const resourceLink = Array.isArray(link) ? link[0] : link;

  // Return a loading state if resourceLink is not yet defined
  if (!resourceLink) return <div>Loading...</div>;

  // Decode the resource link for safe use in src
  const decodedLink = decodeURIComponent(resourceLink);

  return (
    <div>
      <h1>Resource</h1>
      <iframe
        src={decodedLink}
        width="100%"
        height="600px"
        title="Resource Document"
      />
    </div>
  );
};

export default ResourcePage;
