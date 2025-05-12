import PageOne from './Pages/PageOne';
import '../styles/Page.css';

const Page = () => {
  // const [page, setPage] = useState(1);

  return (
    <div className="page-container" data-testid="page-container">
      <PageOne />
    </div>
  );
};

export default Page;
