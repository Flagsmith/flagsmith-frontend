// import propTypes from 'prop-types';
import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import cn from 'classnames';

export default class Paging extends PureComponent {
    static displayName = 'Paging';

    static propTypes = {
        paging: propTypes.object,
        onPreviousClick: propTypes.func,
        onNextClick: propTypes.func,
        goToPage: propTypes.func,
        isLoading: propTypes.bool,
    };

    render() {
        const { props: {
            paging,
            onNextClick,
            onPreviousClick,
            isLoading,
            goToPage,
        } } = this;
        const currentIndex = paging.currentPage - 1;
        const lastPage = Math.ceil(paging.count / paging.pageSize);
        const spaceBetween = 3;
        // const numberOfPages = Math.ceil(paging.count / paging.pageSize);
        const from = Math.max(0, currentIndex - spaceBetween);
        const to = Math.min(lastPage, currentIndex + spaceBetween);
        const range = _.range(from, to);
        return (
            <Row className="list-item paging" style={isLoading ? { opacity: 0.5 } : {}}>
                <Button
                  disabled={!paging.previous} className="icon btn-paging ion-ios-arrow-back"
                  onClick={onPreviousClick}
                />
                <Row className="list-item">
                    {_.map(range, index => (
                        <div
                          key={index} role="button"
                          className={cn({
                              page: true,
                              'active': currentIndex === index,
                          })}
                          onClick={paging.currentPage === index + 1 ? undefined : () => goToPage(index + 1)}
                        >
                            {index + 1}

                        </div>
                    ))}
                </Row>
                <Button
                  className="icon btn-paging ion-ios-arrow-forward" disabled={!paging.next}
                  onClick={onNextClick}
                />
            </Row>
        );
    }
}
