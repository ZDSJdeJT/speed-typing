function WordContainer(props: { children: React.ReactNode }) {
  return (
    <div className="relative text-3xl font-mono leading-relaxed break-all">
      {props.children}
    </div>
  );
}

export { WordContainer };
