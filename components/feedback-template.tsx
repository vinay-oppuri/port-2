interface FeedbackTemplateProps {
    feedback: string;
    name: string;
}

export const FeedbackTemplate = ({ feedback, name }: FeedbackTemplateProps) => {
    return (
        <div>
            <h1>Feedback from {name}</h1>
            <p>{feedback}</p>
        </div>
    );
}