const handleInfiniteScroll = async (e, nextPage, fetchNext) => {
  let fetching = false;
  const { scrollHeight, scrollTop, clientHeight } = e.target.scrollingElement;
  if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
    fetching = true;
    if (nextPage) await fetchNext();
    fetching = false;
  }
};

export { handleInfiniteScroll };
