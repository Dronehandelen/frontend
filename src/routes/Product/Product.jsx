import React from 'react';
import {
    Badge,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Col,
    Container,
    Row,
} from 'reactstrap';
import formatPrice from '../../helpers/formatPrice.js';
import Editor from '../../components/Editor';
import styled from 'styled-components';
import { convertFromRaw, EditorState } from 'draft-js';
import { getDefaultProductImageUrl } from '../../helpers/product.js';
import tracking from '../../helpers/tracking';
import Reviews from './Reviews.jsx';
import Stars from '../../components/Stars.jsx';
import RelatedProducts from './components/RelatedProducts';
import FullscreenImage from '../../components/FullscreenImage';
import { Link } from 'react-router-dom';
import useHasScrolled from '../../hooks/useHasScrolled';
import { promotion, default as ProductHelper } from '../../helpers/product';
import DiscountBobble from '../../components/DiscountBobble/DiscountBobble';
import appConfig from '../../config/app';
import useIsDevice from '../../hooks/useIsDevice';
import MonitorProduct from '../../components/MonitorProduct';
import ProductContext from '../../contexts/product.js';
import AddToCartButton from './components/AddToCartButton.jsx';
import NewBobble from '../../components/NewBobble/NewBobble.jsx';
import CustomCard from '../../components/Card.jsx';
import CustomCardTitle from './components/CardTitle.jsx';
import PackageProducts from './components/PackageProducts';
import AdminActions from './components/AdminActions.jsx';
import ProductStockStatus from '../../components/ProductStockStatus.jsx';

const ImageWrapper = styled.div`
    height: ${(props) => props.height}vh;
    width: 100%;
    background: url('${(props) => props.src}') center center no-repeat;
    background-size: contain;
    cursor: pointer;
`;

const BeforePrice = styled.span`
    font-weight: normal;
    font-size: 1rem;
`;

const Arrow = styled.div`
    flex-direction: column;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    left: ${(props) => (props.right ? 'unset' : '-10px')};
    right: ${(props) => (!props.right ? 'unset' : '-10px')};
    top: calc(50% - 20px);

    & > div {
        padding: 10px;
    }
`;

const Product = ({ product, addProduct, refetch }) => {
    const [isFullscreenOpen, setIsFullscreenOpen] = React.useState(false);
    const url = getDefaultProductImageUrl(product);
    const augmentedProduct = ProductHelper(product);
    const isMobile = useIsDevice('<=', 'md');
    const isLarge = useIsDevice('>=', 'lg');
    const productContext = React.useContext(ProductContext);

    const [selectedImageIndex, setSelectedImageIndex] = React.useState(() => {
        const url = getDefaultProductImageUrl(product);
        const index = product.images.findIndex((image) => image.url === url);

        return index !== -1 ? index : 0;
    });

    const selectedImageUrl =
        product.images.length && product.images[selectedImageIndex]
            ? product.images[selectedImageIndex].url
            : url;

    React.useEffect(() => {
        tracking.productPageView(product);
    }, [product]);

    useHasScrolled(() => {
        tracking.event('Product detail page', `Scrolled`);
        tracking.productEvent(product.id, 'scrolled');
    }, []);

    const { hasPromotion, promotionPresent, shopVIP } = promotion(product);

    return (
        <Container>
            <Row>
                <Col>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/">{appConfig.appName}</Link>
                        </BreadcrumbItem>
                        {productContext.extraBreadcrumb}
                        <BreadcrumbItem active>{product.title}</BreadcrumbItem>
                    </Breadcrumb>
                </Col>
            </Row>
            <Row>
                <Col md={12} lg={8}>
                    <div className="d-lg-none d-block">
                        <h3>{product.title}</h3>
                        <p>{product.shortDescription}</p>
                    </div>
                    <div className="position-relative">
                        {hasPromotion && (
                            <DiscountBobble
                                present={promotionPresent}
                                top={20}
                                right={10}
                                vip={shopVIP}
                            />
                        )}
                        {!hasPromotion && augmentedProduct.isNew() && (
                            <NewBobble top={20} right={10} />
                        )}
                        <div className="position-relative">
                            <Arrow
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImageIndex(
                                        selectedImageIndex === 0
                                            ? product.images.length - 1
                                            : selectedImageIndex - 1
                                    );
                                    tracking.event(
                                        'Product detail page',
                                        `Image - Previous image clicked`
                                    );
                                    tracking.productEvent(
                                        product.id,
                                        'previousImage'
                                    );
                                }}
                            >
                                <div>
                                    <i className="fa fa-angle-left fa-3x" />
                                </div>
                            </Arrow>
                            <Arrow
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedImageIndex(
                                        selectedImageIndex + 1 >=
                                            product.images.length
                                            ? 0
                                            : selectedImageIndex + 1
                                    );
                                    tracking.event(
                                        'Product detail page',
                                        `Image - Next image clicked`
                                    );
                                    tracking.productEvent(
                                        product.id,
                                        'nextImage'
                                    );
                                }}
                                right
                            >
                                <div>
                                    <i className="fa fa-angle-right fa-3x" />
                                </div>
                            </Arrow>
                            <ImageWrapper
                                src={selectedImageUrl}
                                height={isLarge ? 40 : 30}
                                onClick={() => {
                                    if (!isMobile) {
                                        setIsFullscreenOpen(true);
                                        tracking.event(
                                            'Product detail page',
                                            `Image - Show image in full screen`
                                        );
                                        tracking.productEvent(
                                            product.id,
                                            'imageFullscreen'
                                        );
                                    }
                                }}
                            />
                        </div>
                        <Row className="mt-2 d-none d-md-flex">
                            {product.images.map((image, index) => (
                                <Col
                                    xs={2}
                                    key={image.fileId}
                                    onClick={() => {
                                        setSelectedImageIndex(index);
                                        tracking.event(
                                            'Product detail page',
                                            `Image - Thumbnail image clicked`
                                        );
                                        tracking.productEvent(
                                            product.id,
                                            'thumbnailImageClick'
                                        );
                                    }}
                                    className="mb-2"
                                >
                                    <ImageWrapper src={image.url} height={8} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
                <Col md={12} lg={4} className="pt-3">
                    <div className="d-none d-lg-block">
                        <h3>{product.title}</h3>
                        <p>{product.shortDescription}</p>
                    </div>
                    {product.stars && (
                        <div className="mb-2">
                            <Stars stars={product.stars.rating} /> (
                            {product.stars.count})
                        </div>
                    )}
                    <Card body className="bg-light">
                        {product.expiredAt && (
                            <>
                                <Badge color="danger">Utgått</Badge>
                                <p className="mt-2">
                                    Vi selger ikke denne varen lenger.
                                </p>
                                <p>
                                    Årsak kan være at produktet er utgått fra
                                    leverandør, erstattet med ny vare, har hatt
                                    liten etterspørsel eller lignende.
                                </p>
                                <p>
                                    Hvis du lurer på noe så kan du ta kontakt
                                    gjennom chat funksjonen.
                                </p>
                            </>
                        )}
                        {!product.expiredAt && (
                            <>
                                <h2>
                                    {formatPrice(product.price)}{' '}
                                    {hasPromotion && (
                                        <BeforePrice>
                                            <i>
                                                Før{' '}
                                                {formatPrice(
                                                    product.originalPrice
                                                )}
                                            </i>
                                        </BeforePrice>
                                    )}
                                </h2>
                                {augmentedProduct.totalCountAvailable() ===
                                    0 && (
                                    <MonitorProduct productId={product.id} />
                                )}
                                {augmentedProduct.totalCountAvailable() !==
                                    0 && (
                                    <AddToCartButton
                                        max={
                                            product.stock +
                                            product.countAvailableForBackorder
                                        }
                                        onAdd={(amount) => {
                                            tracking.event(
                                                'Product detail page',
                                                `Click "Legg til i handlekurven" button`
                                            );
                                            addProduct(amount);
                                        }}
                                    />
                                )}
                                <ProductStockStatus
                                    className="mt-2"
                                    stock={product.stock}
                                    countAvailableForBackorder={
                                        product.countAvailableForBackorder
                                    }
                                    backorderMessage={product.backorderMessage}
                                />
                                <div className="mt-3">
                                    <i className="fa fa-check" />{' '}
                                    <Link to="/customer-support/price-match">
                                        Prismatch
                                    </Link>
                                </div>
                                <div className="mt-2">
                                    <i className="fa fa-check" /> Sendes innen
                                    24t
                                </div>
                                <div className="mt-1">
                                    <i className="fa fa-check" /> Betal med{' '}
                                    <img
                                        width="100"
                                        src="/vipps/vipps.svg"
                                        alt=""
                                    />
                                </div>
                            </>
                        )}
                    </Card>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col lg={7} xs={12}>
                    <CustomCard>
                        <CustomCardTitle>Produktinfo</CustomCardTitle>
                        <hr />
                        {product.type === 'package' && (
                            <>
                                <PackageProducts
                                    packageProducts={product.packageProducts}
                                />
                                <hr />
                            </>
                        )}
                        <Editor
                            editorState={EditorState.createWithContent(
                                convertFromRaw(JSON.parse(product.description))
                            )}
                        />
                    </CustomCard>
                </Col>
                <Col lg={5}>
                    <Reviews
                        reviews={product.reviews}
                        product={product}
                        refetch={refetch}
                    />
                    {product.accessories.length !== 0 && (
                        <RelatedProducts
                            title="Tilbehør"
                            listName="Product page - Accessories"
                            products={product.accessories}
                        />
                    )}
                    <RelatedProducts
                        title="Andre har sett på"
                        listName="Product page - Also viewed"
                        products={product.relatedProducts}
                    />
                    {product.accessories.length === 0 &&
                        product.relatedByOrderProducts.length !== 0 && (
                            <RelatedProducts
                                title="Andre har kjøpt"
                                listName="Product page - Also bought"
                                products={product.relatedByOrderProducts}
                            />
                        )}
                </Col>
            </Row>
            <FullscreenImage
                selectedImage={isFullscreenOpen && selectedImageUrl}
                onClose={() => setIsFullscreenOpen(false)}
                onPrevious={
                    selectedImageIndex > 0 &&
                    (() => setSelectedImageIndex(selectedImageIndex - 1))
                }
                onNext={
                    selectedImageIndex + 1 < product.images.length &&
                    (() => setSelectedImageIndex(selectedImageIndex + 1))
                }
            />
        </Container>
    );
};

export default Product;
