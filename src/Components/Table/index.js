import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import { Button } from '../Button';

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    POINTS: list => sortBy(list, 'points').reverse(),
}

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sortKey: 'NONE',
            isSortReverse: false,
        }

        this.onSort = this.onSort.bind(this);
    }

    onSort(sortKey) {
        const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
        this.setState({ sortKey, isSortReverse });
    }

    render() {
        const { list, removeItem} = this.props;
        const { sortKey, isSortReverse } = this.state;
        const sortedList = SORTS[sortKey](list);
        const reverseSortedList = isSortReverse ? sortedList.reverse() : sortedList;

        return(
            <div className="col-md-10 col-md-offset-1">
                <div className="text-center">
                    <hr />
                        <h5>Sort By</h5>
                        <Sort onSort={this.onSort} sortKey={'NONE'} activeSort={sortKey} className="btn btn-default btn-xs sortBtn">
                            Default
                        </Sort>
                        <Sort onSort={this.onSort} sortKey={'TITLE'} activeSort={sortKey} className="btn btn-default btn-xs sortBtn">
                            Title
                        </Sort>
                        <Sort onSort={this.onSort} sortKey={'AUTHOR'} activeSort={sortKey} className="btn btn-default btn-xs sortBtn">
                            Author
                        </Sort>
                        <Sort onSort={this.onSort} sortKey={'POINTS'} activeSort={sortKey} className="btn btn-default btn-xs sortBtn">
                            Point
                        </Sort>
                    <hr />
                </div>
                    {
                        // list.filter(isSearch(searchValue)).map(item => {
                        reverseSortedList.map(item => {
                            return (
                                <div key={item.objectID} className="">
                                    <h2><a href={item.url}>{item.title}</a></h2>
                                    <h4>
                                        {'Point :' + item.points} | {'Author :' + item.author}
                                        <Button onClick={() => removeItem(item.objectID)}>
                                            Remove Me
                                        </Button>
                                    </h4>

                                </div>
                            )
                        })
                    }
            </div>
        )
    }
}

Table.PropTypes = {
    list: PropTypes.arrayOf(
        PropTypes.shape({
            objectID: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            points: PropTypes.number.isRequired,
        })
    ).isRequired,
    removeItem: PropTypes.func.isRequired
}

const Sort = ({sortKey, onSort, children, className, activeSort}) =>
{
    const classSort = ['btn btn-default btn-xs sortBtn'];

    if(sortKey === activeSort) {
        classSort.push('btn btn-primary btn-xs sortBtn');
    }

    return (
        <button className={classSort} onClick={ () => onSort(sortKey) }>
                { children }
        </button>
    )
}

export default Table;