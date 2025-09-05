import AuthProvider from "./AuthContext";
import CourseProvider from "./CourseContext";
import EnrolledProvider from "./EnrolledContext";
import PublishProvider from "./PublishContext";
import PaymentProvider from "./PaymentContext";

const StoreProvider = ({ children }) => {
    return (
        <AuthProvider>
            <CourseProvider>
                <EnrolledProvider>
                    <PublishProvider>
                        <PaymentProvider>
                            {children}
                        </PaymentProvider>
                    </PublishProvider>
                </EnrolledProvider>
            </CourseProvider>
        </AuthProvider>
    );
};

export default StoreProvider;
