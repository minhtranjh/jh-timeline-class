import React, { Component } from "react";
import "./PaginationBar.css";
class PaginationBar extends Component {
  state = {
    listLiTag: [],
  };
  componentDidMount() {
    this.renderListPageNumber(this.props.currentPage);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.isLoading !== this.props.isLoading) {
      this.renderListPageNumber(this.props.currentPage);
    }
  }
  pagingListMember(currentPage = this.props.currentPage) {
    this.props.handlePagingListMember(currentPage);
    this.renderListPageNumber(currentPage);
  }

  renderListPageNumber(currentPage) {
    const { totalPages } = this.props;
    let listLiTag = [];
    let numsBeforeCurrentPage = currentPage - 1;
    let numsAfterCurrentPage = currentPage + 1;
    console.log(numsBeforeCurrentPage,numsAfterCurrentPage);
    if (currentPage > 1) {
      const prevButton = this.createPagingPrevButton(currentPage);
      listLiTag.push(prevButton);
    }
    if (currentPage > 2) {
      const pageNumber = this.createPageNumber(1);
      listLiTag.push(pageNumber);
    }
    if (currentPage > 3) {
      const dots = this.createPagingDot("dot-r");
      listLiTag.push(dots);
    }
    if (currentPage === totalPages) {
      numsBeforeCurrentPage = numsBeforeCurrentPage - 2;
    } else if (currentPage === totalPages - 1) {
      numsBeforeCurrentPage = numsBeforeCurrentPage - 1;
    }
    if (currentPage === 1) {
      numsAfterCurrentPage = numsAfterCurrentPage + 2;
    } else if (currentPage === 2) {
      numsAfterCurrentPage = numsAfterCurrentPage + 1;
    }
    for (
      let pageNum = numsBeforeCurrentPage;
      pageNum <= numsAfterCurrentPage;
      pageNum++
    ) {
      if (pageNum > totalPages) {
        continue;
      }
      if (pageNum === 0) {
        pageNum = pageNum + 1;
      }
      const pageNumber = this.createPageNumber(pageNum, currentPage);
      listLiTag.push(pageNumber);
    }
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        const dots = this.createPagingDot("dot-l");
        listLiTag.push(dots);
      }
      const pageNumber = this.createPageNumber(totalPages);
      listLiTag.push(pageNumber);
    }
    if (currentPage < totalPages) {
      const nextBtn = this.createPagingNextButton(currentPage);
      listLiTag.push(nextBtn);
    }
    this.setState({
      listLiTag,
    });
  }
  createPagingPrevButton(currentPage) {
    const liTag = (
      <li
        key="prev"
        onClick={() => this.pagingListMember(currentPage - 1)}
        className="page-btn prev"
      >
        <span>
          <i className="fas fa-angle-left"></i>
          Prev
        </span>
      </li>
    );
    return liTag;
  }
  createPagingNextButton(currentPage) {
    const liTag = (
      <li
        key="next"
        onClick={() => this.pagingListMember(currentPage + 1)}
        className="page-btn next"
      >
        <span>
          Next
          <i className="fas fa-angle-left"></i>
        </span>
      </li>
    );
    return liTag;
  }
  createPageNumber(num, currentPage) {
    const liTag = (
      <li
        key={num}
        onClick={() => this.pagingListMember(num)}
        className={currentPage === num ? "page-item is-active" : "page-item"}
      >
        <span> {num}</span>
      </li>
    );
    return liTag;
  }
  createPagingDot(key) {
    const liTag = (
      <li key={key} className="page-item">
        <span>...</span>
      </li>
    );
    return liTag;
  }
  render() {
    const { listLiTag } = this.state;
    return (
      <div className="pagination-bar">
        <ul className="page-list">{listLiTag}</ul>
      </div>
    );
  }
}

export default PaginationBar;
