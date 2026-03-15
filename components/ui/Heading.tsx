

interface HeadingProps extends React.PropsWithChildren {
    total: number;

}

const Heading = (props: HeadingProps) => {
    const { total, children } = props;
    if (total === 0) {
        return null;
    }
    return <div>
        <h2 className="text-xl font-medium text-gray-900">
            {children}
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
            Cantidad de productos encontrados:  <span className="font-bold text-gray-900">{total}</span>
        </p>
    </div>
};

export default Heading;