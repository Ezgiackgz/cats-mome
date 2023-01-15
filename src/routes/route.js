import {Outlet ,useLoaderData, Form , NavLink , useNavigation} from "react-router-dom";
import {getContacts , createContact} from "../contacts";


export async function loader() {
    const contacts = await getContacts();
    return { contacts };
}
export async function action() {
    const contact = await createContact();
    return { contact };
}

export default function Root() {
    const {contacts} = useLoaderData();
    const navigation = useNavigation();
    return (
        <>
            <div id="sidebar">
                <h1>Cats Mome</h1>
                <div>
                    <form id="search-form" role="search">
                        <input id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q"/>
                        <div id="search-spinner" aria-hidden hidden={true}/>
                        <div className="sr-only" aria-live="polite"></div>
                    </form>
                    <div>
                        <Form method="post">
                            <button type="submit">Ekle</button>
                        </Form>

                    </div>

                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink to={`contacts/${contact.id}`}  className={({ isActive, isPending }) => isActive ? "active" : isPending ? "pending" : ""}>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                    { /*
                        <ul>
                            <li>
                                <Link to={`/contacts/1`}>Your Name</Link>
                            </li>
                            <li>
                                <Link to={`/contacts/2`}>Your Name</Link>
                            </li>
                        </ul>
                   */ }

                </nav>
            </div>
            <div id="detail" className={navigation.state === "loading" ? "loading" : ""}>
                <Outlet />
            </div>
        </>
    );
}