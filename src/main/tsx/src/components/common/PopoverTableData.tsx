import { OverlayTrigger, Popover } from "react-bootstrap";

interface PopoverTDProps {
    title: string;
    items: string[];
}
const PopoverTableData: React.FC<PopoverTDProps> = ({
    title,
    items,
}: PopoverTDProps) => {
    return (
        <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
                <Popover>
                    <Popover.Header as="h3">{title}</Popover.Header>
                    <Popover.Body>
                        {items.length > 0 ? (
                            <ul>
                                {items.map((item) => (
                                    <li>{item}</li>
                                ))}
                            </ul>
                        ) : (
                            <>
                                <strong>
                                    {"no " + title.toLowerCase() + "!! "}
                                </strong>
                                edit the request to add some.
                            </>
                        )}
                    </Popover.Body>
                </Popover>
            }
        >
            <td aria-label={title}>{items.length}</td>
        </OverlayTrigger>
    );
};
export default PopoverTableData;
