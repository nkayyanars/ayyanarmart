import AnalyticsCharts from '../components/AnalyticsCharts';
import { useProducts } from '../context/ProductContext';

function AnalyticsPage() {
  const { closings } = useProducts();
  return <AnalyticsCharts closings={closings} />;
}

export default AnalyticsPage;
