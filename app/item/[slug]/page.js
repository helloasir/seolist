import data from '../../../data/staticData.json';

export const generateMetadata = ({ params }) => {
  const slug = params.slug;
  const item = data.find((d) => d.name.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!item) {
    return {
      title: 'Item Not Found',
      description: 'The item you are looking for does not exist.',
    };
  }

  return {
    title: `${item.name} - Details`,
    description: item.description,
  };
};

export default function ItemPage({ params }) {
  const { slug } = params;
  const item = data.find((d) => d.name.toLowerCase().replace(/\s+/g, '-') === slug);

  if (!item) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Item Not Found</h1>
        <p>The item you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
    </div>
  );
}
