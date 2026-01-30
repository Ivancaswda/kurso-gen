type Props = {
    html: unknown; // ⬅️ важно
};

const ComfToReadContent = ({ html }: Props) => {
    if (typeof html !== "string" || html.trim().length === 0) {
        return (
            <div className="text-gray-500 italic">
                Контент временно недоступен. Попробуйте перегенерировать.
            </div>
        );
    }

    const parts = html.split(/```(\w+)?\n([\s\S]*?)```/g);

    return (
        <div className="prose prose-lg max-w-none prose-p:leading-relaxed prose-p:mb-4 prose-ul:my-4 prose-li:mb-2 prose-strong:text-gray-900">
            {parts.map((part, i) => {
                if (i % 3 === 2) {
                    const language = parts[i - 1] || "javascript";
                    return (
                        <div key={i} className="my-6 rounded-xl overflow-hidden">
                            <SyntaxHighlighter
                                language={language}
                                style={materialDark}
                                customStyle={{
                                    padding: "20px",
                                    borderRadius: "12px",
                                    fontSize: "14px",
                                }}
                            >
                                {part}
                            </SyntaxHighlighter>
                        </div>
                    );
                }

                if (i % 3 === 0) {
                    return (
                        <div
                            key={i}
                            dangerouslySetInnerHTML={{ __html: part }}
                        />
                    );
                }

                return null;
            })}
        </div>
    );
};

export default ComfToReadContent;
