import CatalogFilters from "../catalogFilters/CatalogFilters";
import CatalogList from "../catalogList/CatalogList";

const Catalog = () => {
  return (
    <section className="catalog page-section">
      <div className="container">
        <h1 className="catalog__title title">Games list</h1>
        <CatalogFilters />
        <div className="catalog__body">
          <CatalogList />
        </div>
      </div>
    </section>
  );
};
export default Catalog;