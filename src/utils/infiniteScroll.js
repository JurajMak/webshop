const handleInfiniteScroll = async (e, nextPage, fetchNext, isFetching) => {
  const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
  if (!isFetching && scrollHeight - scrollTop <= clientHeight * 1.5) {
    if (nextPage) await fetchNext();
  }
};

export { handleInfiniteScroll };
