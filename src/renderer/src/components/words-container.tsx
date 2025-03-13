function WordContainer(props: { children: React.ReactNode }) {
  return (
    <div className="max-w-xl relative text-3xl font-mono leading-relaxed break-all">
      {props.children}
    </div>
  );
}

export { WordContainer };
