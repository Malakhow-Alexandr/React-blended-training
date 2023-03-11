import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    searchQuery: '',
    page: 1,
    error: null,
    photos: [],
    total_results: 0,
    outOfImg: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.getPhotos(searchQuery, page);
    }
  }

  changeSearchQuery = searchQuery => {
    this.setState({
      searchQuery: searchQuery,
      page: 1,
      error: null,
      photos: [],
      total_results: 0,
      outOfImg: false,
    });
  };

  getPhotos = async (query, page) => {
    if (!query) {
      return;
    }
    try {
      const { photos, total_results } = await ImageService.getImages(
        query,
        page
      );
      if (photos.length === 0) {
        this.setState({
          outOfImg: true,
        });
      }
      this.setState(prevState => ({
        photos: [...prevState.photos, ...photos],
        total_results,
      }));
    } catch (error) {
      this.setState({ error });
    }
  };

  onButtonClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { photos, total_results, outOfImg, searchQuery, error } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.changeSearchQuery} />

        {outOfImg && (
          <Text textAlign="center">
            Sorry. There are no {searchQuery} images ... 😭
          </Text>
        )}
        {error && (
          <Text textAlign="center">Sorry. Error {error.message} 😭</Text>
        )}
        <Grid>
          {photos.map(({ id, avg_color, alt, src: { large: photo } }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img src={photo} alt={alt} />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {photos.length > 0 && photos.length < total_results && (
          <Button onClick={this.onButtonClick}>Load More</Button>
        )}
      </>
    );
  }
}
