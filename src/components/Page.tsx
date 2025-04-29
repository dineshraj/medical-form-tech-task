import PageOne from './Pages/PageOne';
import '../styles/Page.css';

const Page = () => {
  return (
    <div className="page-container" data-testid="page-container">
      <PageOne />
    </div>
  );
};

export default Page;
