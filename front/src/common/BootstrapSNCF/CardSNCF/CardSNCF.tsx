import cx from 'classnames';
import { Link } from 'react-router-dom';

type CardProps = {
  link: string;
  img: string;
  title: string;
  description?: string;
  disabledLink?: boolean;
  openInNewTab?: boolean;
};

const CardSNCF = ({
  link,
  img,
  title,
  description,
  disabledLink = false,
  openInNewTab = false,
}: CardProps) => (
  <Link
    to={link}
    {...(openInNewTab
      ? {
          target: '_blank',
        }
      : {})}
    className={cx('card overflow-hidden mb-2', disabledLink && 'disabled-link')}
  >
    <img className="card-img-top" alt={title} src={img} />
    <div className="card-body text-center">
      <h5 data-testid="page-title" className="card-title mb-0 text-base font-weight-normal">
        {title}
      </h5>
      {description && <p className="card-text">{description}</p>}
    </div>
  </Link>
);

export default CardSNCF;
