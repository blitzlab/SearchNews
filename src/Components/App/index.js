import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {
    DEFAULT_QUERY,
    PATH_BASE,
    PATH_SEARCH,
    PARAM_SEARCH,
    DEFAULT_PAGE,
    PARAM_PAGE
} from '../../constants/index';
import Table from '../Table';
import Search from '../Search';
import { Loading } from '../Button';

// const withLoading = (Component) => ({isLoading, ...rest}) =>
//     isLoading ? <Loading /> : <Component {...rest} />;

const updateApiNews = (hits, page) => prevState => {
    const {results, searchKey} = prevState;

    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updateHits = [...oldHits, ...hits];

    return {results: { ...results, [searchKey]: {hits: updateHits, page}}, isLoading: false}
}

class List extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchValue: DEFAULT_QUERY,
            isLoading: false,
        }

        this.removeItem = this.removeItem.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.fetchApiNews = this.fetchApiNews.bind(this);
        this.setApiNews = this.setApiNews.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    searchItem(event) {
        this.setState({searchValue: event.target.value})
    }

    removeItem(id) {
        const {results, searchKey} = this.state;
        const isNotId = item => item.objectID !== id;

        const {hits, page} = results[searchKey];

        const updatedList = hits.filter(isNotId);
        // this.setState({result: Object.assign({}, result, {hits: updatedList})});

        this.setState({results: {...results, [searchKey]: { hits: updatedList, page}}});
    }

    setApiNews(result) {
        const { hits, page } = result;
        // const oldHits = page !== 0 ? this.state.result.hits : [];
        this.setState(updateApiNews(hits, page));
    }

    fetchApiNews(searchValue, page) {
        this.setState({isLoading: true});
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchValue}&${PARAM_PAGE}${page}`)
                .then(response => response.json())
                .then(result => this.setApiNews(result))
                .catch(e => e);
    }

    componentDidMount() {
        const { searchValue } = this.state;
        this.setState({searchKey: searchValue});
        this.fetchApiNews(searchValue, DEFAULT_PAGE);
    }

    // search on submit
    onSubmit(event) {
        event.preventDefault();
        const { searchValue } = this.state;
        this.setState({searchKey: searchValue});
        if(this.checkSearchValue(searchValue)) {
            this.fetchApiNews(searchValue, DEFAULT_PAGE);
        }
    }

    checkSearchValue(searchValue) {
        return !this.state.results[searchValue];
    }



    render() {

        const { results, searchValue, searchKey, isLoading} = this.state;
        const page = (results && results[searchKey] && results[searchKey].page) || 0;
        const list = (results && results[searchKey] && results[searchKey].hits) || [];

        return(
            <div className="App">
                <Grid fluid style={{'textAlign': 'center'}}>
                    <Row>
                        <div className="jumbotron">
                            {/* Props = parsing data state to other Component */}
                            <Search onChange={this.searchItem} value={searchValue} onSubmit={this.onSubmit}>
                                Search News
                            </Search>
                        </div>
                    </Row>
                </Grid>

                <Grid>
                    <Row>
                        <Col md={10} mdOffset={1}>
                            { results &&
                            <Table list={list} searchValue={searchValue} removeItem={this.removeItem}/>
                            }

                            { isLoading ? <Loading /> :
                                <div className="text-center alert">
                                    <button onClick={() => this.fetchApiNews(searchValue, page + 1)} className="btn btn-primary">Load More</button>
                                </div>
                            }
                        </Col>
                    </Row>
                </Grid>

            </div>
        )
    }
}

export default List;