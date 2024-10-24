import { useRouter } from 'next/router';

const ResourcePage = () => {
  const router = useRouter();
  const { link } = router.query;

  const resourceLink = Array.isArray(link) ? link[0] : link;

  if (!resourceLink) return <div>Loading...</div>;

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
